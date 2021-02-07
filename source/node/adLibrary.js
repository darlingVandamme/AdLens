
//https://www.npmjs.com/package/fb
//https://developers.facebook.com/docs/marketing-api/reference/ads_archive/
//https://developers.facebook.com/docs/pages/access-tokens
//  long lived user access token?  (60 days)

const {MongoClient} = require('mongodb')
const {FB, FacebookApiException} = require('fb');
const config = require("./config")
const promises = []

console.log(config.type+" "+config.mongoURL+" "+config.mongoUser)
console.log("auth token "+config.fbAccessToken)

let client
let db
let pages = []

FB.setAccessToken(config.fbAccessToken)
// long lived user token. Expires  2021-03-23

const node = "ads_archive"

function getLongToken(callback){
    FB.api('oauth/access_token', {
        client_id: config.fbClientId,
        client_secret: config.fbClientSecret,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: config.fbAccessToken

    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(JSON.stringify(res))
        let accessToken = res.access_token;
        FB.setAccessToken(accessToken)
        callback(accessToken)
    });
}

function getPosts(id, after,count){
    count = count||0
    if (count>2000) return  // prevent loops

    let params = {"fields":"id,ad_status,ad_active_status,ad_creation_time,ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title," +
            "ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,currency,demographic_distribution,funding_entity," +
            "impressions,page_id,page_name,potential_reach,publisher_platforms,region_distribution,spend",
        "ad_reached_countries":['BE'],
        "status" : "ALL",
        //"search_terms":"N-va",
        "ad_type" : "POLITICAL_AND_ISSUE_ADS"}

    params.search_page_ids = id
        //"334361224413,166525380128528,52997544531,1480604288895159,131167466986260,251034964924788," +
        //"824061911277202,119566796112345,518573208206444,1477520555859157" //,157739524296696,533686686730041" //NVA

    if (after){
        params.after = after
    }

    let promise = FB.api(node, params)
    promises.push(promise)
    promise.then(function (res) {
        //console.log(res.data);
        if (res.data.length>0) {
            save(res.data)
            console.log("data " + res.data.length);
            //console.log(res.data);
            if (res.paging) { //get more
                console.log("next " + res.paging.cursors.after);
                getPosts(id, res.paging.cursors.after, count + res.data.length)
            }
        } else {
            console.log("Retrieved all for " + id+"  count "+count);
            markPage(id,count)
        }
    });
    promise.catch((error) =>{
        console.log(JSON.stringify(error))
        markPage(id,0,error)
    })

}

function init(callback){
    let connectionConf = {useUnifiedTopology: true}
    if (config.mongoUser && config.mongoUser!=""){
        connectionConf.auth = {user : config.mongoUser,
            password : config.mongoPassword}
    }
    client = new MongoClient(config.mongoURL, connectionConf)

    client.connect( () =>{
        db = client.db(config.dbName)
        callback()
    })
}

function close(){
    console.log("start close " +promises.length)
    let promiseCount =promises.length
    Promise.allSettled(promises).then(()=>{
        if (promiseCount == promises.length){
            console.log("All promises closed " +promises.length)
            client.close()
        } else {
            close()
        }
        }
    )
}

function markPage(id,count,error){
    try {
        const coll = db.collection('pages')
        const update = {
            count:count,
            error:error,
            lastCheck:Date.now()
        }
        promises.push(coll.updateOne({pageID:id},{$set:update}))
    } catch (err){
        console.error(err.message)
    } finally{
        //client.close()
    }
}


function save(data){
    try {
        // plain save all ads
        data.forEach(ad => {
            ad.timestamp = new Date()
        })
        const coll = db.collection('ads')
        promises.push(coll.insertMany(data))

        // update impressions, potential reach, spend
        const coll2 = db.collection('adsEvol')
        data.forEach(ad =>{
            const update = {
                $set:{
                    updateTimestamp: Date.now(),
                    moment: new Date()
                },
                $setOnInsert:ad,
                $push:{
                    impressionEvol:{
                        timestamp: Date.now(),
                        moment: new Date(),
                        value: ad?.impressions?.lower_bound,
                        impressions: ad.impressions
                    },
                    reachEvol:{
                        timestamp: Date.now(),
                        moment: new Date(),
                        value: ad.potential_reach?.lower_bound,
                        reach: ad.potential_reach
                    },
                    spendingEvol:{timestamp: Date.now(),
                        moment: new Date(),
                        value: ad.spend?.lower_bound,
                        reach: ad.spend
                    }
                }
            }
            promises.push(coll2.updateOne({id:ad.id},update,{upsert:true}))
        })


    } catch (err){
        console.error(err.message)
    } finally{
        //client.close()
    }
}

function getIDs(){
    try {
        const coll = db.collection('pages')
        // db.pages.find({status:1, lastCheck:{$lt: Date.now() - (24*60*60*1000)}}).count()
        const query ={
            status:1,
            lastCheck: {$lt: Date.now() - (12*60*60*1000)}
        }
        const cursor = coll.find(query).limit(150)

        /*cursor.forEach(page =>{
                console.log(JSON.stringify(page.pageID))
            })*/
        let promise = cursor.toArray()
        promises.push(promise)
        promise.then((result) => {
                pages = result
                return pages
            })
        return promise
    } catch (err){
        console.error(err.message)
    } finally{
        //client.close()
    }
}

/*getLongToken(t=> {
    console.log(t)
    getPosts()
})*/
/*
init( () => {
    getPosts("334361224413")
    close()
    }
)
*/

init(() =>
    getIDs()
        .then(pages => {
            pages.forEach((page)=>{
                console.log(JSON.stringify(page))
                getPosts(page.pageID)
            })
    } )
        .then(()=>{
            close()
        })

)



