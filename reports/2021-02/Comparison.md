## Comparison Ad Library online report - API

I'm running my API script for about 1 week, so I have daily data for most of the pages.
Since the API only shows a spending range, and not an exact number. We have to make an estimate.

From the daily data, I can make an estimate on how much is spend every day. 
It looks like the average between the lozer and upper bound gives a rather good estimate of the reported numbers.

Some issues:
* The ranges become bigger when more money is spent. For the high selling ads, the data becomes less accurate
* I can only know on which day an ad falls into the next range. This should be no real problem if we look over the data for eg. one month.

## Excel data 
(Comparison report - API)

* The first tabs (06 - 12) contain the daily FB report data for 2021-02-06 - 2021-02-12
* Tab 'week' contains the main part
    * The weekly FB report data
    * Linked in 'Party' and 'type' info for every page 
    * Lookup from the daily data from the precious tabs (col H - N)
    * Lookup from the API data (col Q - V)
    * Sums and difference
* Pivot shows the report data per party. I'll make the same for the month data Januari
* Pages is the list of pages that I' monitoring daily
    * column I is 'party' manually added
    * column H is type 
        * 1 = Main party page
        * 2 = Local page
        * 3 = Personal page
        * 4 = Associated page
* DB contains a query of the spendings as I can track them per page (2021-02-07 - 2021-02-12)
* Pivot DB contains the same data but more comparable to the report data

I plan to do the same excercise in one week, so that we have a longer range of data.
I hope to see it converging a bit more.
   

 