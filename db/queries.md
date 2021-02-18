## Queries

#### Changes

add a timestamp for each ad (not needed anymore)
> db.ads.find({}).forEach(a => {a.timestamp = a._id.getTimestamp(); db.ads.save(a)})

exclude pages that were not checked or had an error  
> db.pages.updateMany({"lastCheck":0},{$set:{status:0}})
> db.pages.updateMany({error:{$ne:null}},{$set:{status:0}})

Remove duplicates:
>db.pages.aggregate([{$match: {   "status" : 1 }}, {$sort: {   pageID: 1 }}, {$group: {   _id: "$pageID",   pages: {     $push: "$_id"   },   count:{$sum:1} }}, {$match: {   count:{$gt:1} }}, {$unwind: {   path: "$pages",   includeArrayIndex: 'index',   preserveNullAndEmptyArrays: false }}, {$match: {   index:{$gt:0} }}]).forEach(p=>{ db.pages.updateOne({_id:p.pages},{$set:{status:-2}}) })

Add initial spendingEvol item (at start of the array)
> db.adsEvol.find({}).forEach( ad =>{
  	db.adsEvol.updateOne({"_id":ad._id},
  		{$push:{
  			spendingEvol:{
  				$each:[{ 
  					moment:new Date(ad.ad_creation_time),
  					timestamp:new Date(ad.ad_creation_time).getTime(),
  					value:0,
  					spending : {
  						"lower_bound" : "0",
  						"upper_bound" : "0"
  					} 
  				}],
  				$position:0
  			}
  		}
  	}
  	)
  }	
  )


Update evolution value
>  db.adsEvol.find({}).forEach(ad => {
        ad.spendingEvol.forEach(ev=>{
            ev.valueMin=parseInt(ev.spending.lower_bound);
            ev.valueMax=parseInt(ev.spending.upper_bound);
            ev.value=(ev.valueMin + ev.valueMax)/2;            
        });
        db.adsEvol.updateOne({_id:ad._id}, {$set:{spendingEvol:ad.spendingEvol}})
    }
)



### Find data

count Ads since date
> db.ads.find({timestamp:{$gt:new Date("2021-02-06 16:00:00")}}).count()


Find ads with changing spend amount
> [{$addFields: {  
>    max: {$max :"$spendingEvol.value"},  
>    min: {$min :"$spendingEvol.value"},  
>    }}, {$addFields: {  
>    range:{$subtract:["$max","$min"]}  
>  }}, {$match: {  
>    range:{$gt:0}  
>  }}, {$count: 'total'}]  

Spending per page
>  [{$addFields: {
>     max: {$max :"$spendingEvol.value"},
>     min: {$min :"$spendingEvol.value"},
>     }}, {$addFields: {
>     range:{$subtract:["$max","$min"]}
>   }}, {$addFields: {
>     evol2: "$spendingEvol"
>   }}, {$unwind: {
>     path: "$spendingEvol",
>     includeArrayIndex: 'index',
>     preserveNullAndEmptyArrays: true
>   }}, {$addFields: {
>     previous: {$arrayElemAt:["$evol2",{
>       $max:[0,{$subtract:["$index",1]}]}]}
>   }}, {$addFields: {
>     dateDiff: {$subtract:["$spendingEvol.timestamp","$previous.timestamp"]},
>     spendDiff: {$subtract:["$spendingEvol.value","$previous.value"]},
>     year:{$year:"$spendingEvol.moment"},
>     month:{$month:"$spendingEvol.moment"},
>     day:{$dayOfMonth:"$spendingEvol.moment"},
>   }}, {$match: {
>     spendDiff:{$gt:0}
>   }}, {$group: {
>     _id: "$page_id",
>     page_name:{$first:"$page_name"},
>     total:{$sum:"$spendDiff"},
>     evolution:{$push:{
>       moment:"$spendingEvol.moment",
>       timestamp:"$spendingEvol.timestamp",
>       spending:"$spendDiff",
>       total:"$spendingEvol.value",
>       year:"$year",
>       month:"$month",
>       day:"$day",
>       date:{$dateFromParts:{
>         year:"$year",
>         month:"$month",
>         day:"$day"
>       }}
>     }}
>   }}]

Spending per day
>  [{$addFields: {
     max: {$max :"$spendingEvol.value"},
     min: {$min :"$spendingEvol.value"},
   }}, {$addFields: {
     evol2: "$spendingEvol"
   }}, {$unwind: {
     path: "$spendingEvol",
     includeArrayIndex: 'index',
     preserveNullAndEmptyArrays: true
   }}, {$addFields: {
     previous: {$arrayElemAt:["$evol2",{
       $max:[0,{$subtract:["$index",1]}]}]}
   }}, {$addFields: {
     dateDiff: {$subtract:["$spendingEvol.timestamp","$previous.timestamp"]},
     spendDiff: {$subtract:["$spendingEvol.value","$previous.value"]},
     year:{$year:"$spendingEvol.moment"},
     month:{$month:"$spendingEvol.moment"},
     day:{$dayOfMonth:"$spendingEvol.moment"},
   }}, {$match: {
     spendDiff:{$gt:0}
   }}, {$group: {
     _id: {year:"$year",
       month:"$month",
       day:"$day"},
     total:{$sum:"$spendDiff"},
     pages:{$push:{
       spend:{$sum:"$spendDiff"},
       page_name:"$page_name",
       moment:"$spendingEvol.moment"
       }}
   }}]

Spending per day per party
