# RaceLine

## Basic RaceLine

A dynamic line chart race animation showing ranking changes over time.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'raceLine',
    measures: [
      {
        id: 'sales',
        alias: 'Sales (10K CNY)',
        autoFormat: true,
      },
    ],
    player: {
      interval: 500,
    },
    dimensions: [
      {
        id: 'date',
        alias: 'Year',
      },
      {
        id: 'category',
        alias: 'Product Category',
      },
    ],
    dataset: [
      {
        date: '1990',
        category: 'Electronics',
        sales: 119,
      },
      {
        date: '1990',
        category: 'Apparel',
        sales: 197,
      },
      {
        date: '1990',
        category: 'Food & Beverage',
        sales: 283,
      },
      {
        date: '1990',
        category: 'Home & Construction',
        sales: 137,
      },
      {
        date: '1990',
        category: 'Beauty & Personal Care',
        sales: 51,
      },
      {
        date: '1990',
        category: 'Auto Parts',
        sales: 80,
      },
      {
        date: '1990',
        category: 'Books & Education',
        sales: 90,
      },
      {
        date: '1990',
        category: 'Sports & Outdoors',
        sales: 59,
      },
      {
        date: '1991',
        category: 'Electronics',
        sales: 130,
      },
      {
        date: '1991',
        category: 'Apparel',
        sales: 212,
      },
      {
        date: '1991',
        category: 'Food & Beverage',
        sales: 308,
      },
      {
        date: '1991',
        category: 'Home & Construction',
        sales: 171,
      },
      {
        date: '1991',
        category: 'Beauty & Personal Care',
        sales: 55,
      },
      {
        date: '1991',
        category: 'Auto Parts',
        sales: 85,
      },
      {
        date: '1991',
        category: 'Books & Education',
        sales: 98,
      },
      {
        date: '1991',
        category: 'Sports & Outdoors',
        sales: 63,
      },
      {
        date: '1992',
        category: 'Electronics',
        sales: 142,
      },
      {
        date: '1992',
        category: 'Apparel',
        sales: 229,
      },
      {
        date: '1992',
        category: 'Food & Beverage',
        sales: 331,
      },
      {
        date: '1992',
        category: 'Home & Construction',
        sales: 172,
      },
      {
        date: '1992',
        category: 'Beauty & Personal Care',
        sales: 62,
      },
      {
        date: '1992',
        category: 'Auto Parts',
        sales: 95,
      },
      {
        date: '1992',
        category: 'Books & Education',
        sales: 96,
      },
      {
        date: '1992',
        category: 'Sports & Outdoors',
        sales: 73,
      },
      {
        date: '1993',
        category: 'Electronics',
        sales: 161,
      },
      {
        date: '1993',
        category: 'Apparel',
        sales: 237,
      },
      {
        date: '1993',
        category: 'Food & Beverage',
        sales: 358,
      },
      {
        date: '1993',
        category: 'Home & Construction',
        sales: 209,
      },
      {
        date: '1993',
        category: 'Beauty & Personal Care',
        sales: 73,
      },
      {
        date: '1993',
        category: 'Auto Parts',
        sales: 85,
      },
      {
        date: '1993',
        category: 'Books & Education',
        sales: 97,
      },
      {
        date: '1993',
        category: 'Sports & Outdoors',
        sales: 85,
      },
      {
        date: '1994',
        category: 'Electronics',
        sales: 164,
      },
      {
        date: '1994',
        category: 'Apparel',
        sales: 241,
      },
      {
        date: '1994',
        category: 'Food & Beverage',
        sales: 382,
      },
      {
        date: '1994',
        category: 'Home & Construction',
        sales: 195,
      },
      {
        date: '1994',
        category: 'Beauty & Personal Care',
        sales: 75,
      },
      {
        date: '1994',
        category: 'Auto Parts',
        sales: 122,
      },
      {
        date: '1994',
        category: 'Books & Education',
        sales: 100,
      },
      {
        date: '1994',
        category: 'Sports & Outdoors',
        sales: 83,
      },
      {
        date: '1995',
        category: 'Electronics',
        sales: 160,
      },
      {
        date: '1995',
        category: 'Apparel',
        sales: 251,
      },
      {
        date: '1995',
        category: 'Food & Beverage',
        sales: 383,
      },
      {
        date: '1995',
        category: 'Home & Construction',
        sales: 220,
      },
      {
        date: '1995',
        category: 'Beauty & Personal Care',
        sales: 83,
      },
      {
        date: '1995',
        category: 'Auto Parts',
        sales: 111,
      },
      {
        date: '1995',
        category: 'Books & Education',
        sales: 111,
      },
      {
        date: '1995',
        category: 'Sports & Outdoors',
        sales: 85,
      },
      {
        date: '1996',
        category: 'Electronics',
        sales: 192,
      },
      {
        date: '1996',
        category: 'Apparel',
        sales: 256,
      },
      {
        date: '1996',
        category: 'Food & Beverage',
        sales: 400,
      },
      {
        date: '1996',
        category: 'Home & Construction',
        sales: 191,
      },
      {
        date: '1996',
        category: 'Beauty & Personal Care',
        sales: 93,
      },
      {
        date: '1996',
        category: 'Auto Parts',
        sales: 135,
      },
      {
        date: '1996',
        category: 'Books & Education',
        sales: 110,
      },
      {
        date: '1996',
        category: 'Sports & Outdoors',
        sales: 91,
      },
      {
        date: '1997',
        category: 'Electronics',
        sales: 183,
      },
      {
        date: '1997',
        category: 'Apparel',
        sales: 230,
      },
      {
        date: '1997',
        category: 'Food & Beverage',
        sales: 383,
      },
      {
        date: '1997',
        category: 'Home & Construction',
        sales: 202,
      },
      {
        date: '1997',
        category: 'Beauty & Personal Care',
        sales: 86,
      },
      {
        date: '1997',
        category: 'Auto Parts',
        sales: 107,
      },
      {
        date: '1997',
        category: 'Books & Education',
        sales: 102,
      },
      {
        date: '1997',
        category: 'Sports & Outdoors',
        sales: 92,
      },
      {
        date: '1998',
        category: 'Electronics',
        sales: 198,
      },
      {
        date: '1998',
        category: 'Apparel',
        sales: 238,
      },
      {
        date: '1998',
        category: 'Food & Beverage',
        sales: 413,
      },
      {
        date: '1998',
        category: 'Home & Construction',
        sales: 221,
      },
      {
        date: '1998',
        category: 'Beauty & Personal Care',
        sales: 88,
      },
      {
        date: '1998',
        category: 'Auto Parts',
        sales: 127,
      },
      {
        date: '1998',
        category: 'Books & Education',
        sales: 117,
      },
      {
        date: '1998',
        category: 'Sports & Outdoors',
        sales: 93,
      },
      {
        date: '1999',
        category: 'Electronics',
        sales: 239,
      },
      {
        date: '1999',
        category: 'Apparel',
        sales: 275,
      },
      {
        date: '1999',
        category: 'Food & Beverage',
        sales: 472,
      },
      {
        date: '1999',
        category: 'Home & Construction',
        sales: 281,
      },
      {
        date: '1999',
        category: 'Beauty & Personal Care',
        sales: 118,
      },
      {
        date: '1999',
        category: 'Auto Parts',
        sales: 167,
      },
      {
        date: '1999',
        category: 'Books & Education',
        sales: 116,
      },
      {
        date: '1999',
        category: 'Sports & Outdoors',
        sales: 118,
      },
      {
        date: '2000',
        category: 'Electronics',
        sales: 223,
      },
      {
        date: '2000',
        category: 'Apparel',
        sales: 291,
      },
      {
        date: '2000',
        category: 'Food & Beverage',
        sales: 473,
      },
      {
        date: '2000',
        category: 'Home & Construction',
        sales: 228,
      },
      {
        date: '2000',
        category: 'Beauty & Personal Care',
        sales: 126,
      },
      {
        date: '2000',
        category: 'Auto Parts',
        sales: 141,
      },
      {
        date: '2000',
        category: 'Books & Education',
        sales: 119,
      },
      {
        date: '2000',
        category: 'Sports & Outdoors',
        sales: 125,
      },
      {
        date: '2001',
        category: 'Electronics',
        sales: 257,
      },
      {
        date: '2001',
        category: 'Apparel',
        sales: 295,
      },
      {
        date: '2001',
        category: 'Food & Beverage',
        sales: 483,
      },
      {
        date: '2001',
        category: 'Home & Construction',
        sales: 296,
      },
      {
        date: '2001',
        category: 'Beauty & Personal Care',
        sales: 134,
      },
      {
        date: '2001',
        category: 'Auto Parts',
        sales: 144,
      },
      {
        date: '2001',
        category: 'Books & Education',
        sales: 122,
      },
      {
        date: '2001',
        category: 'Sports & Outdoors',
        sales: 151,
      },
      {
        date: '2002',
        category: 'Electronics',
        sales: 320,
      },
      {
        date: '2002',
        category: 'Apparel',
        sales: 364,
      },
      {
        date: '2002',
        category: 'Food & Beverage',
        sales: 564,
      },
      {
        date: '2002',
        category: 'Home & Construction',
        sales: 320,
      },
      {
        date: '2002',
        category: 'Beauty & Personal Care',
        sales: 167,
      },
      {
        date: '2002',
        category: 'Auto Parts',
        sales: 176,
      },
      {
        date: '2002',
        category: 'Books & Education',
        sales: 130,
      },
      {
        date: '2002',
        category: 'Sports & Outdoors',
        sales: 163,
      },
      {
        date: '2003',
        category: 'Electronics',
        sales: 318,
      },
      {
        date: '2003',
        category: 'Apparel',
        sales: 309,
      },
      {
        date: '2003',
        category: 'Food & Beverage',
        sales: 554,
      },
      {
        date: '2003',
        category: 'Home & Construction',
        sales: 343,
      },
      {
        date: '2003',
        category: 'Beauty & Personal Care',
        sales: 172,
      },
      {
        date: '2003',
        category: 'Auto Parts',
        sales: 194,
      },
      {
        date: '2003',
        category: 'Books & Education',
        sales: 140,
      },
      {
        date: '2003',
        category: 'Sports & Outdoors',
        sales: 168,
      },
      {
        date: '2004',
        category: 'Electronics',
        sales: 341,
      },
      {
        date: '2004',
        category: 'Apparel',
        sales: 331,
      },
      {
        date: '2004',
        category: 'Food & Beverage',
        sales: 623,
      },
      {
        date: '2004',
        category: 'Home & Construction',
        sales: 360,
      },
      {
        date: '2004',
        category: 'Beauty & Personal Care',
        sales: 183,
      },
      {
        date: '2004',
        category: 'Auto Parts',
        sales: 220,
      },
      {
        date: '2004',
        category: 'Books & Education',
        sales: 146,
      },
      {
        date: '2004',
        category: 'Sports & Outdoors',
        sales: 171,
      },
      {
        date: '2005',
        category: 'Electronics',
        sales: 357,
      },
      {
        date: '2005',
        category: 'Apparel',
        sales: 374,
      },
      {
        date: '2005',
        category: 'Food & Beverage',
        sales: 623,
      },
      {
        date: '2005',
        category: 'Home & Construction',
        sales: 361,
      },
      {
        date: '2005',
        category: 'Beauty & Personal Care',
        sales: 214,
      },
      {
        date: '2005',
        category: 'Auto Parts',
        sales: 244,
      },
      {
        date: '2005',
        category: 'Books & Education',
        sales: 132,
      },
      {
        date: '2005',
        category: 'Sports & Outdoors',
        sales: 198,
      },
      {
        date: '2006',
        category: 'Electronics',
        sales: 412,
      },
      {
        date: '2006',
        category: 'Apparel',
        sales: 397,
      },
      {
        date: '2006',
        category: 'Food & Beverage',
        sales: 685,
      },
      {
        date: '2006',
        category: 'Home & Construction',
        sales: 363,
      },
      {
        date: '2006',
        category: 'Beauty & Personal Care',
        sales: 225,
      },
      {
        date: '2006',
        category: 'Auto Parts',
        sales: 229,
      },
      {
        date: '2006',
        category: 'Books & Education',
        sales: 140,
      },
      {
        date: '2006',
        category: 'Sports & Outdoors',
        sales: 189,
      },
      {
        date: '2007',
        category: 'Electronics',
        sales: 470,
      },
      {
        date: '2007',
        category: 'Apparel',
        sales: 392,
      },
      {
        date: '2007',
        category: 'Food & Beverage',
        sales: 667,
      },
      {
        date: '2007',
        category: 'Home & Construction',
        sales: 362,
      },
      {
        date: '2007',
        category: 'Beauty & Personal Care',
        sales: 230,
      },
      {
        date: '2007',
        category: 'Auto Parts',
        sales: 216,
      },
      {
        date: '2007',
        category: 'Books & Education',
        sales: 148,
      },
      {
        date: '2007',
        category: 'Sports & Outdoors',
        sales: 222,
      },
      {
        date: '2008',
        category: 'Electronics',
        sales: 424,
      },
      {
        date: '2008',
        category: 'Apparel',
        sales: 373,
      },
      {
        date: '2008',
        category: 'Food & Beverage',
        sales: 668,
      },
      {
        date: '2008',
        category: 'Home & Construction',
        sales: 326,
      },
      {
        date: '2008',
        category: 'Beauty & Personal Care',
        sales: 251,
      },
      {
        date: '2008',
        category: 'Auto Parts',
        sales: 189,
      },
      {
        date: '2008',
        category: 'Books & Education',
        sales: 140,
      },
      {
        date: '2008',
        category: 'Sports & Outdoors',
        sales: 217,
      },
      {
        date: '2009',
        category: 'Electronics',
        sales: 448,
      },
      {
        date: '2009',
        category: 'Apparel',
        sales: 393,
      },
      {
        date: '2009',
        category: 'Food & Beverage',
        sales: 662,
      },
      {
        date: '2009',
        category: 'Home & Construction',
        sales: 312,
      },
      {
        date: '2009',
        category: 'Beauty & Personal Care',
        sales: 265,
      },
      {
        date: '2009',
        category: 'Auto Parts',
        sales: 277,
      },
      {
        date: '2009',
        category: 'Books & Education',
        sales: 130,
      },
      {
        date: '2009',
        category: 'Sports & Outdoors',
        sales: 215,
      },
      {
        date: '2010',
        category: 'Electronics',
        sales: 623,
      },
      {
        date: '2010',
        category: 'Apparel',
        sales: 471,
      },
      {
        date: '2010',
        category: 'Food & Beverage',
        sales: 846,
      },
      {
        date: '2010',
        category: 'Home & Construction',
        sales: 682,
      },
      {
        date: '2010',
        category: 'Beauty & Personal Care',
        sales: 350,
      },
      {
        date: '2010',
        category: 'Auto Parts',
        sales: 347,
      },
      {
        date: '2010',
        category: 'Books & Education',
        sales: 160,
      },
      {
        date: '2010',
        category: 'Sports & Outdoors',
        sales: 338,
      },
      {
        date: '2011',
        category: 'Electronics',
        sales: 602,
      },
      {
        date: '2011',
        category: 'Apparel',
        sales: 463,
      },
      {
        date: '2011',
        category: 'Food & Beverage',
        sales: 882,
      },
      {
        date: '2011',
        category: 'Home & Construction',
        sales: 613,
      },
      {
        date: '2011',
        category: 'Beauty & Personal Care',
        sales: 415,
      },
      {
        date: '2011',
        category: 'Auto Parts',
        sales: 308,
      },
      {
        date: '2011',
        category: 'Books & Education',
        sales: 169,
      },
      {
        date: '2011',
        category: 'Sports & Outdoors',
        sales: 341,
      },
      {
        date: '2012',
        category: 'Electronics',
        sales: 652,
      },
      {
        date: '2012',
        category: 'Apparel',
        sales: 470,
      },
      {
        date: '2012',
        category: 'Food & Beverage',
        sales: 890,
      },
      {
        date: '2012',
        category: 'Home & Construction',
        sales: 563,
      },
      {
        date: '2012',
        category: 'Beauty & Personal Care',
        sales: 425,
      },
      {
        date: '2012',
        category: 'Auto Parts',
        sales: 360,
      },
      {
        date: '2012',
        category: 'Books & Education',
        sales: 175,
      },
      {
        date: '2012',
        category: 'Sports & Outdoors',
        sales: 294,
      },
      {
        date: '2013',
        category: 'Electronics',
        sales: 739,
      },
      {
        date: '2013',
        category: 'Apparel',
        sales: 526,
      },
      {
        date: '2013',
        category: 'Food & Beverage',
        sales: 979,
      },
      {
        date: '2013',
        category: 'Home & Construction',
        sales: 520,
      },
      {
        date: '2013',
        category: 'Beauty & Personal Care',
        sales: 443,
      },
      {
        date: '2013',
        category: 'Auto Parts',
        sales: 430,
      },
      {
        date: '2013',
        category: 'Books & Education',
        sales: 179,
      },
      {
        date: '2013',
        category: 'Sports & Outdoors',
        sales: 371,
      },
      {
        date: '2014',
        category: 'Electronics',
        sales: 810,
      },
      {
        date: '2014',
        category: 'Apparel',
        sales: 481,
      },
      {
        date: '2014',
        category: 'Food & Beverage',
        sales: 1003,
      },
      {
        date: '2014',
        category: 'Home & Construction',
        sales: 597,
      },
      {
        date: '2014',
        category: 'Beauty & Personal Care',
        sales: 508,
      },
      {
        date: '2014',
        category: 'Auto Parts',
        sales: 472,
      },
      {
        date: '2014',
        category: 'Books & Education',
        sales: 185,
      },
      {
        date: '2014',
        category: 'Sports & Outdoors',
        sales: 376,
      },
      {
        date: '2015',
        category: 'Electronics',
        sales: 810,
      },
      {
        date: '2015',
        category: 'Apparel',
        sales: 534,
      },
      {
        date: '2015',
        category: 'Food & Beverage',
        sales: 1037,
      },
      {
        date: '2015',
        category: 'Home & Construction',
        sales: 590,
      },
      {
        date: '2015',
        category: 'Beauty & Personal Care',
        sales: 569,
      },
      {
        date: '2015',
        category: 'Auto Parts',
        sales: 454,
      },
      {
        date: '2015',
        category: 'Books & Education',
        sales: 179,
      },
      {
        date: '2015',
        category: 'Sports & Outdoors',
        sales: 411,
      },
      {
        date: '2016',
        category: 'Electronics',
        sales: 897,
      },
      {
        date: '2016',
        category: 'Apparel',
        sales: 555,
      },
      {
        date: '2016',
        category: 'Food & Beverage',
        sales: 979,
      },
      {
        date: '2016',
        category: 'Home & Construction',
        sales: 713,
      },
      {
        date: '2016',
        category: 'Beauty & Personal Care',
        sales: 568,
      },
      {
        date: '2016',
        category: 'Auto Parts',
        sales: 470,
      },
      {
        date: '2016',
        category: 'Books & Education',
        sales: 178,
      },
      {
        date: '2016',
        category: 'Sports & Outdoors',
        sales: 451,
      },
      {
        date: '2017',
        category: 'Electronics',
        sales: 954,
      },
      {
        date: '2017',
        category: 'Apparel',
        sales: 557,
      },
      {
        date: '2017',
        category: 'Food & Beverage',
        sales: 1122,
      },
      {
        date: '2017',
        category: 'Home & Construction',
        sales: 782,
      },
      {
        date: '2017',
        category: 'Beauty & Personal Care',
        sales: 655,
      },
      {
        date: '2017',
        category: 'Auto Parts',
        sales: 439,
      },
      {
        date: '2017',
        category: 'Books & Education',
        sales: 174,
      },
      {
        date: '2017',
        category: 'Sports & Outdoors',
        sales: 481,
      },
      {
        date: '2018',
        category: 'Electronics',
        sales: 969,
      },
      {
        date: '2018',
        category: 'Apparel',
        sales: 591,
      },
      {
        date: '2018',
        category: 'Food & Beverage',
        sales: 1138,
      },
      {
        date: '2018',
        category: 'Home & Construction',
        sales: 727,
      },
      {
        date: '2018',
        category: 'Beauty & Personal Care',
        sales: 686,
      },
      {
        date: '2018',
        category: 'Auto Parts',
        sales: 472,
      },
      {
        date: '2018',
        category: 'Books & Education',
        sales: 190,
      },
      {
        date: '2018',
        category: 'Sports & Outdoors',
        sales: 432,
      },
      {
        date: '2019',
        category: 'Electronics',
        sales: 940,
      },
      {
        date: '2019',
        category: 'Apparel',
        sales: 615,
      },
      {
        date: '2019',
        category: 'Food & Beverage',
        sales: 1164,
      },
      {
        date: '2019',
        category: 'Home & Construction',
        sales: 718,
      },
      {
        date: '2019',
        category: 'Beauty & Personal Care',
        sales: 846,
      },
      {
        date: '2019',
        category: 'Auto Parts',
        sales: 548,
      },
      {
        date: '2019',
        category: 'Books & Education',
        sales: 196,
      },
      {
        date: '2019',
        category: 'Sports & Outdoors',
        sales: 499,
      },
      {
        date: '2020',
        category: 'Electronics',
        sales: 1374,
      },
      {
        date: '2020',
        category: 'Apparel',
        sales: 637,
      },
      {
        date: '2020',
        category: 'Food & Beverage',
        sales: 1175,
      },
      {
        date: '2020',
        category: 'Home & Construction',
        sales: 782,
      },
      {
        date: '2020',
        category: 'Beauty & Personal Care',
        sales: 766,
      },
      {
        date: '2020',
        category: 'Auto Parts',
        sales: 446,
      },
      {
        date: '2020',
        category: 'Books & Education',
        sales: 187,
      },
      {
        date: '2020',
        category: 'Sports & Outdoors',
        sales: 417,
      },
      {
        date: '2021',
        category: 'Electronics',
        sales: 1272,
      },
      {
        date: '2021',
        category: 'Apparel',
        sales: 746,
      },
      {
        date: '2021',
        category: 'Food & Beverage',
        sales: 1460,
      },
      {
        date: '2021',
        category: 'Home & Construction',
        sales: 1015,
      },
      {
        date: '2021',
        category: 'Beauty & Personal Care',
        sales: 1062,
      },
      {
        date: '2021',
        category: 'Auto Parts',
        sales: 804,
      },
      {
        date: '2021',
        category: 'Books & Education',
        sales: 230,
      },
      {
        date: '2021',
        category: 'Sports & Outdoors',
        sales: 867,
      },
      {
        date: '2022',
        category: 'Electronics',
        sales: 1159,
      },
      {
        date: '2022',
        category: 'Apparel',
        sales: 659,
      },
      {
        date: '2022',
        category: 'Food & Beverage',
        sales: 1455,
      },
      {
        date: '2022',
        category: 'Home & Construction',
        sales: 969,
      },
      {
        date: '2022',
        category: 'Beauty & Personal Care',
        sales: 998,
      },
      {
        date: '2022',
        category: 'Auto Parts',
        sales: 649,
      },
      {
        date: '2022',
        category: 'Books & Education',
        sales: 203,
      },
      {
        date: '2022',
        category: 'Sports & Outdoors',
        sales: 760,
      },
      {
        date: '2023',
        category: 'Electronics',
        sales: 1523,
      },
      {
        date: '2023',
        category: 'Apparel',
        sales: 737,
      },
      {
        date: '2023',
        category: 'Food & Beverage',
        sales: 1511,
      },
      {
        date: '2023',
        category: 'Home & Construction',
        sales: 1014,
      },
      {
        date: '2023',
        category: 'Beauty & Personal Care',
        sales: 1181,
      },
      {
        date: '2023',
        category: 'Auto Parts',
        sales: 704,
      },
      {
        date: '2023',
        category: 'Books & Education',
        sales: 235,
      },
      {
        date: '2023',
        category: 'Sports & Outdoors',
        sales: 876,
      },
      {
        date: '2024',
        category: 'Electronics',
        sales: 1634,
      },
      {
        date: '2024',
        category: 'Apparel',
        sales: 765,
      },
      {
        date: '2024',
        category: 'Food & Beverage',
        sales: 1637,
      },
      {
        date: '2024',
        category: 'Home & Construction',
        sales: 1235,
      },
      {
        date: '2024',
        category: 'Beauty & Personal Care',
        sales: 1432,
      },
      {
        date: '2024',
        category: 'Auto Parts',
        sales: 788,
      },
      {
        date: '2024',
        category: 'Books & Education',
        sales: 228,
      },
      {
        date: '2024',
        category: 'Sports & Outdoors',
        sales: 758,
      },
      {
        date: '2025',
        category: 'Electronics',
        sales: 2118,
      },
      {
        date: '2025',
        category: 'Apparel',
        sales: 868,
      },
      {
        date: '2025',
        category: 'Food & Beverage',
        sales: 1809,
      },
      {
        date: '2025',
        category: 'Home & Construction',
        sales: 1218,
      },
      {
        date: '2025',
        category: 'Beauty & Personal Care',
        sales: 1415,
      },
      {
        date: '2025',
        category: 'Auto Parts',
        sales: 814,
      },
      {
        date: '2025',
        category: 'Books & Education',
        sales: 225,
      },
      {
        date: '2025',
        category: 'Sports & Outdoors',
        sales: 974,
      },
      {
        date: '2026',
        category: 'Electronics',
        sales: 2087,
      },
      {
        date: '2026',
        category: 'Apparel',
        sales: 788,
      },
      {
        date: '2026',
        category: 'Food & Beverage',
        sales: 1694,
      },
      {
        date: '2026',
        category: 'Home & Construction',
        sales: 1267,
      },
      {
        date: '2026',
        category: 'Beauty & Personal Care',
        sales: 1684,
      },
      {
        date: '2026',
        category: 'Auto Parts',
        sales: 950,
      },
      {
        date: '2026',
        category: 'Books & Education',
        sales: 209,
      },
      {
        date: '2026',
        category: 'Sports & Outdoors',
        sales: 871,
      },
      {
        date: '2027',
        category: 'Electronics',
        sales: 1995,
      },
      {
        date: '2027',
        category: 'Apparel',
        sales: 834,
      },
      {
        date: '2027',
        category: 'Food & Beverage',
        sales: 1770,
      },
      {
        date: '2027',
        category: 'Home & Construction',
        sales: 1384,
      },
      {
        date: '2027',
        category: 'Beauty & Personal Care',
        sales: 1586,
      },
      {
        date: '2027',
        category: 'Auto Parts',
        sales: 815,
      },
      {
        date: '2027',
        category: 'Books & Education',
        sales: 209,
      },
      {
        date: '2027',
        category: 'Sports & Outdoors',
        sales: 1158,
      },
      {
        date: '2028',
        category: 'Electronics',
        sales: 2442,
      },
      {
        date: '2028',
        category: 'Apparel',
        sales: 904,
      },
      {
        date: '2028',
        category: 'Food & Beverage',
        sales: 1885,
      },
      {
        date: '2028',
        category: 'Home & Construction',
        sales: 1404,
      },
      {
        date: '2028',
        category: 'Beauty & Personal Care',
        sales: 1775,
      },
      {
        date: '2028',
        category: 'Auto Parts',
        sales: 999,
      },
      {
        date: '2028',
        category: 'Books & Education',
        sales: 197,
      },
      {
        date: '2028',
        category: 'Sports & Outdoors',
        sales: 1157,
      },
      {
        date: '2029',
        category: 'Electronics',
        sales: 2377,
      },
      {
        date: '2029',
        category: 'Apparel',
        sales: 879,
      },
      {
        date: '2029',
        category: 'Food & Beverage',
        sales: 1914,
      },
      {
        date: '2029',
        category: 'Home & Construction',
        sales: 1467,
      },
      {
        date: '2029',
        category: 'Beauty & Personal Care',
        sales: 1840,
      },
      {
        date: '2029',
        category: 'Auto Parts',
        sales: 1146,
      },
      {
        date: '2029',
        category: 'Books & Education',
        sales: 220,
      },
      {
        date: '2029',
        category: 'Sports & Outdoors',
        sales: 1156,
      },
      {
        date: '2030',
        category: 'Electronics',
        sales: 2749,
      },
      {
        date: '2030',
        category: 'Apparel',
        sales: 946,
      },
      {
        date: '2030',
        category: 'Food & Beverage',
        sales: 2126,
      },
      {
        date: '2030',
        category: 'Home & Construction',
        sales: 1774,
      },
      {
        date: '2030',
        category: 'Beauty & Personal Care',
        sales: 1972,
      },
      {
        date: '2030',
        category: 'Auto Parts',
        sales: 1344,
      },
      {
        date: '2030',
        category: 'Books & Education',
        sales: 226,
      },
      {
        date: '2030',
        category: 'Sports & Outdoors',
        sales: 1519,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
