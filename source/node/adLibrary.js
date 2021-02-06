
//https://www.npmjs.com/package/fb
//https://developers.facebook.com/docs/marketing-api/reference/ads_archive/
//https://developers.facebook.com/docs/pages/access-tokens
//  long lived user access token?  (60 days)

const {MongoClient} = require('mongodb')
const {FB, FacebookApiException} = require('fb');
const config = require("./config")

let uri = "mongodb://localhost"
const client = new MongoClient(uri);

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

function getPosts(after,count){
    count = count||0
    if (count>20) return

    let params = {"fields":"id,ad_status,ad_active_status,ad_creation_time,ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title," +
            "ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,currency,demographic_distribution,funding_entity," +
            "impressions,page_id,page_name,potential_reach,publisher_platforms,region_distribution,spend",
        "ad_reached_countries":['BE'],
        "status" : "ALL",
        //"search_terms":"N-va",
        "ad_type" : "POLITICAL_AND_ISSUE_ADS"}
    params.search_page_ids = "334361224413,166525380128528,52997544531,1480604288895159,131167466986260,251034964924788," +
        "824061911277202,119566796112345,518573208206444,1477520555859157" //,157739524296696,533686686730041" //NVA

    if (after){
        params.after = after
    }
    FB.api(node, params, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        if (res.data.length>0) {
            save(res.data)
            console.log("data " + res.data.length);
            console.log(res.data);

            if (res.paging) {
                console.log("next " + res.paging.cursors.after);
                getPosts(res.paging.cursors.after, count + 1)
            }
        }

    });
    //console.log("end");
}

function init(callback){
    client.connect(callback)
}

function save(data){
    try {
        //await client.connect()
        const db = client.db('adlens')
        const coll = db.collection('ads')
        coll.insertMany(data)
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
init( () => getPosts())

