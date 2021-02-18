# Ads per party
This is one of the first 'proof of concept' reports I created.
In the database I have a list of pageID's that are checked regularly on the fb ads library API
For every page, every 24h, all the running ads are retrieved and stored in the database.
I keep 1 entry per ad ID, and keep a daily record of the the spend amount, impressions and potential reach.
At this moment (2021-02-13) I have 1543 ads.

The result looks something like this:
>  {"_id":{"$oid":"601fde8cfced1f8fd53b3fc1"},  
>  "id":"1445710745621533",  
>  "ad_creation_time":"2020-09-24",  
>  "ad_creative_body":"De paars-groene kernuitstap is totaal onverantwoord. Akkoord? 👍",  
>  "ad_delivery_start_time":"2020-09-24",  
>  "ad_snapshot_url":"https://www.facebook.com/ads/archive/render_ad/?id=1445710745621533&access_token=EAAWx1yol3YMBAEXZAKB9O1KOEPBl4pwlWbTbEHjBmTgYXPuRPvD4RlcSfiX0GtzNBKCysClXQBuXBrjLen0lmiFipqMj4HG3MbkvubYsVZBrmkW9eGXKrKZA1MokmYC0xZATuASeyftSFZAa25bqC86enGzOIgNgRlwwVO680C3ZBoqZC93Boms",  
>  "currency":"EUR",  
>  "demographic_distribution":[{"percentage":"0.000822","age":"55-64","gender":"unknown"},{"percentage":"0.067728","age":"65+","gender":"female"},{"percentage":"0.000307","age":"18-24","gender":"unknown"},{"percentage":"0.001131","age":"45-54","gender":"unknown"},{"percentage":"0.001561","age":"35-44","gender":"unknown"},{"percentage":"0.003455","age":"13-17","gender":"female"},{"percentage":"0.134175","age":"25-34","gender":"male"},{"percentage":"0.124144","age":"55-64","gender":"male"},{"percentage":"0.078138","age":"18-24","gender":"male"},{"percentage":"0.15149","age":"35-44","gender":"male"},{"percentage":"0.06524","age":"55-64","gender":"female"},{"percentage":"0.000816","age":"25-34","gender":"unknown"},{"percentage":"0.14029","age":"45-54","gender":"male"},{"percentage":"0.030992","age":"25-34","gender":"female"},{"percentage":"0.090184","age":"65+","gender":"male"},{"percentage":"0.045884","age":"45-54","gender":"female"},{"percentage":"0.014924","age":"18-24","gender":"female"},{"percentage":"0.037717","age":"35-44","gender":"female"},{"percentage":"0.010238","age":"13-17","gender":"male"},{"percentage":"0.000737","age":"65+","gender":"unknown"},{"percentage":"2.6E-5","age":"13-17","gender":"unknown"}],  
>  "funding_entity":"Nieuw-Vlaamse Alliantie",  
>  "impressionEvol":[{"timestamp":1612701324368,"moment":{"$date":"2021-02-07T12:35:24.368Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}},{"timestamp":1612787402837,"moment":{"$date":"2021-02-08T12:30:02.837Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}},{"timestamp":1612873802561,"moment":{"$date":"2021-02-09T12:30:02.561Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}},{"timestamp":1612960202838,"moment":{"$date":"2021-02-10T12:30:02.838Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}},{"timestamp":1613046603213,"moment":{"$date":"2021-02-11T12:30:03.213Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}},{"timestamp":1613133002615,"moment":{"$date":"2021-02-12T12:30:02.615Z"},"value":"1000000","impressions":{"lower_bound":"1000000"}}],  
>  "impressions":{"lower_bound":"1000000"},  
>  "moment":{"$date":"2021-02-12T12:30:02.615Z"},  
>  "page_id":"24079407056",  
>  "page_name":"Bart De Wever",  
>  "potential_reach":{"lower_bound":"1000001"},  
>  "publisher_platforms":["facebook"],  
>  "reachEvol":[{"timestamp":1612701324368,"moment":{"$date":"2021-02-07T12:35:24.368Z"},"value":"1000001","reach":{"lower_bound":"1000001"}},{"timestamp":1612787402837,"moment":{"$date":"2021-02-08T12:30:02.837Z"},"value":"1000001","reach":{"lower_bound":"1000001"}},{"timestamp":1612873802561,"moment":{"$date":"2021-02-09T12:30:02.561Z"},"value":"1000001","reach":{"lower_bound":"1000001"}},{"timestamp":1612960202838,"moment":{"$date":"2021-02-10T12:30:02.838Z"},"value":"1000001","reach":{"lower_bound":"1000001"}},{"timestamp":1613046603213,"moment":{"$date":"2021-02-11T12:30:03.213Z"},"value":"1000001","reach":{"lower_bound":"1000001"}},{"timestamp":1613133002615,"moment":{"$date":"2021-02-12T12:30:02.615Z"},"value":"1000001","reach":{"lower_bound":"1000001"}}],  
>  "region_distribution":[{"percentage":"1","region":"Flemish Region"}],  
>  "spend":{"lower_bound":"50000","upper_bound":"59999"},  
>  "spendingEvol":[  
>      {"timestamp":1612701324368,  
>       "moment":{"$date":"2021-02-07T12:35:24.368Z"},  
>       "value":50000,"spending":{"lower_bound":"50000","upper_bound":"59999"}},  
>      {"timestamp":1612787402837,  
>       "moment":{"$date":"2021-02-08T12:30:02.837Z"},  
>       "value":50000,"spending":{"lower_bound":"50000","upper_bound":"59999"}},  
>      {"timestamp":1612873802561,  
>       "moment":{"$date":"2021-02-09T12:30:02.561Z"},  
>       "value":60000,"spending":{"lower_bound":"60000","upper_bound":"69999"}},  
>      {"timestamp":1612960202838,  
>       "moment":{"$date":"2021-02-10T12:30:02.838Z"},  
>       "value":60000,"spending":{"lower_bound":"60000","upper_bound":"69999"}},  
>      {"timestamp":1613046603213,"moment":{"$date":"2021-02-11T12:30:03.213Z"},  
>       "value":60000,"spending":{"lower_bound":"60000","upper_bound":"69999"}},  
>      {"timestamp":1613133002615,  
>       "moment":{"$date":"2021-02-12T12:30:02.615Z"},  
>       "value":60000,"spending":{"lower_bound":"60000","upper_bound":"69999"}}],  
> "timestamp":{"$date":"2021-02-07T12:35:24.366Z"},  
> "updateTimestamp":1613133002615}    

For the moment I mainly focus on the spendingEvol. As mentioned before, we do not get an exact amount, but only a range of how much is invested in the ad.
By keeping a daily record, we can more or less track how much is invested in which ads.
I took the lower_bound as the value, this could be an underestimate of the real amount, but for the moment that's not too relevant.
We could also choose for the upper bound or some sort of average.
This ad is running since september 2020. From the spendingEvolution, we can see that there was an extra €10000 invested on 2021-02-09.
Notice that in this case it doesn't matter if we track the lower bound or the upper bound. The €10000 estimate will be quite correct.

I created some database queries to find the types of results we want.
In the excel, we see the result of the query that searches for the changes in spending and groups this per day and per party

For thos interested, the total query pipeline is this:
> [{$addFields: {
    max: {$max :"$spendingEvol.value"},
    min: {$min :"$spendingEvol.value"},
  }},  
>  {$unwind: {
    path: "$spendingEvol",
    includeArrayIndex: 'index',
    preserveNullAndEmptyArrays: true
  }},   
> {$addFields: {
    previous: {$arrayElemAt:["$evol2",{
      $max:[0,{$subtract:["$index",1]}]}]},
    year:{$year:"$spendingEvol.moment"},
    month:{$month:"$spendingEvol.moment"},
    day:{$dayOfMonth:"$spendingEvol.moment"},
  }},  
> {$addFields: {
    dateDiff: {$subtract:["$spendingEvol.timestamp","$previous.timestamp"]},
    spendDiff: {$subtract:["$spendingEvol.value","$previous.value"]},
    date:{$dateFromParts:{
      year:"$year",
      month:"$month",
      day:"$day"
    }}
  }},  
> {$match: {
    spendDiff:{$gt:0}
  }},  
> {$lookup: {
    from: 'validPages',
    localField: 'page_id',
    foreignField: 'pageID',
    as: 'page'
  }},  
> {$unwind: {
    path: "$page",
    includeArrayIndex: 'index',
    preserveNullAndEmptyArrays: false
  }},  
> {$addFields: {
    party: "$page.party"
  }},  
> {$group: {
    _id: {date:"$date",
        party:"$page.party"},
    amount:{$sum:"$spendDiff"},
    count:{$sum:1},
    ads:{$push:{
      spend:{$sum:"$spendDiff"},
      adId: "$id"
    }}
  }},  
> {$addFields: {
    date: "$_id.date",
    party:"$_id.party"
  }}]

    