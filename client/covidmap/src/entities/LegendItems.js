import LegendItem from "./LengendItem";

var legendItems = [
  new LegendItem(
    "1,000,000 +",
    "rgb(220,20,60)",
    // "#8b0000",
    (cases) => cases >= 1_000_000,
    "white"
  ),

  new LegendItem(
    "500,000 - 999,999",
    // "#741f1f",
    "blue",
    (cases) => cases >= 500_000 && cases < 1_000_000,
    "White"
  ),

  new LegendItem(
    "200,000 - 499,999",
    "orange",
    (cases) => cases >= 200_000 && cases < 500_000
  ),

  new LegendItem(
    "50,000 - 199,999",
    "yellow",
    (cases) => cases >= 50_000 && cases < 200_000
  ),

  new LegendItem(
    "10000 - 49,999",
    "green",
    (cases) => cases > 0 && cases < 50_000
  ),

  new LegendItem("0-9999", "#FFFDD0", (cases) => true),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*

#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/
