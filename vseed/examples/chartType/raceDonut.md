# RaceDonut

## Basic RaceDonut

A dynamic donut chart race animation showing ranking changes over time.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'raceDonut',
    measures: [
      {
        id: 'sales',
        alias: '销售额(万元)',
        autoFormat: true,
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '年份',
      },
      {
        id: 'category',
        alias: '商品分类',
      },
    ],
    dataset: [
      {
        date: '1990',
        category: '电子产品',
        sales: 119,
      },
      {
        date: '1990',
        category: '服装鞋帽',
        sales: 197,
      },
      {
        date: '1990',
        category: '食品饮料',
        sales: 283,
      },
      {
        date: '1990',
        category: '家居建材',
        sales: 137,
      },
      {
        date: '1990',
        category: '美妆个护',
        sales: 51,
      },
      {
        date: '1990',
        category: '汽车配件',
        sales: 80,
      },
      {
        date: '1990',
        category: '图书文教',
        sales: 90,
      },
      {
        date: '1990',
        category: '运动户外',
        sales: 59,
      },
      {
        date: '1991',
        category: '电子产品',
        sales: 130,
      },
      {
        date: '1991',
        category: '服装鞋帽',
        sales: 212,
      },
      {
        date: '1991',
        category: '食品饮料',
        sales: 308,
      },
      {
        date: '1991',
        category: '家居建材',
        sales: 171,
      },
      {
        date: '1991',
        category: '美妆个护',
        sales: 55,
      },
      {
        date: '1991',
        category: '汽车配件',
        sales: 85,
      },
      {
        date: '1991',
        category: '图书文教',
        sales: 98,
      },
      {
        date: '1991',
        category: '运动户外',
        sales: 63,
      },
      {
        date: '1992',
        category: '电子产品',
        sales: 142,
      },
      {
        date: '1992',
        category: '服装鞋帽',
        sales: 229,
      },
      {
        date: '1992',
        category: '食品饮料',
        sales: 331,
      },
      {
        date: '1992',
        category: '家居建材',
        sales: 172,
      },
      {
        date: '1992',
        category: '美妆个护',
        sales: 62,
      },
      {
        date: '1992',
        category: '汽车配件',
        sales: 95,
      },
      {
        date: '1992',
        category: '图书文教',
        sales: 96,
      },
      {
        date: '1992',
        category: '运动户外',
        sales: 73,
      },
      {
        date: '1993',
        category: '电子产品',
        sales: 161,
      },
      {
        date: '1993',
        category: '服装鞋帽',
        sales: 237,
      },
      {
        date: '1993',
        category: '食品饮料',
        sales: 358,
      },
      {
        date: '1993',
        category: '家居建材',
        sales: 209,
      },
      {
        date: '1993',
        category: '美妆个护',
        sales: 73,
      },
      {
        date: '1993',
        category: '汽车配件',
        sales: 85,
      },
      {
        date: '1993',
        category: '图书文教',
        sales: 97,
      },
      {
        date: '1993',
        category: '运动户外',
        sales: 85,
      },
      {
        date: '1994',
        category: '电子产品',
        sales: 164,
      },
      {
        date: '1994',
        category: '服装鞋帽',
        sales: 241,
      },
      {
        date: '1994',
        category: '食品饮料',
        sales: 382,
      },
      {
        date: '1994',
        category: '家居建材',
        sales: 195,
      },
      {
        date: '1994',
        category: '美妆个护',
        sales: 75,
      },
      {
        date: '1994',
        category: '汽车配件',
        sales: 122,
      },
      {
        date: '1994',
        category: '图书文教',
        sales: 100,
      },
      {
        date: '1994',
        category: '运动户外',
        sales: 83,
      },
      {
        date: '1995',
        category: '电子产品',
        sales: 160,
      },
      {
        date: '1995',
        category: '服装鞋帽',
        sales: 251,
      },
      {
        date: '1995',
        category: '食品饮料',
        sales: 383,
      },
      {
        date: '1995',
        category: '家居建材',
        sales: 220,
      },
      {
        date: '1995',
        category: '美妆个护',
        sales: 83,
      },
      {
        date: '1995',
        category: '汽车配件',
        sales: 111,
      },
      {
        date: '1995',
        category: '图书文教',
        sales: 111,
      },
      {
        date: '1995',
        category: '运动户外',
        sales: 85,
      },
      {
        date: '1996',
        category: '电子产品',
        sales: 192,
      },
      {
        date: '1996',
        category: '服装鞋帽',
        sales: 256,
      },
      {
        date: '1996',
        category: '食品饮料',
        sales: 400,
      },
      {
        date: '1996',
        category: '家居建材',
        sales: 191,
      },
      {
        date: '1996',
        category: '美妆个护',
        sales: 93,
      },
      {
        date: '1996',
        category: '汽车配件',
        sales: 135,
      },
      {
        date: '1996',
        category: '图书文教',
        sales: 110,
      },
      {
        date: '1996',
        category: '运动户外',
        sales: 91,
      },
      {
        date: '1997',
        category: '电子产品',
        sales: 183,
      },
      {
        date: '1997',
        category: '服装鞋帽',
        sales: 230,
      },
      {
        date: '1997',
        category: '食品饮料',
        sales: 383,
      },
      {
        date: '1997',
        category: '家居建材',
        sales: 202,
      },
      {
        date: '1997',
        category: '美妆个护',
        sales: 86,
      },
      {
        date: '1997',
        category: '汽车配件',
        sales: 107,
      },
      {
        date: '1997',
        category: '图书文教',
        sales: 102,
      },
      {
        date: '1997',
        category: '运动户外',
        sales: 92,
      },
      {
        date: '1998',
        category: '电子产品',
        sales: 198,
      },
      {
        date: '1998',
        category: '服装鞋帽',
        sales: 238,
      },
      {
        date: '1998',
        category: '食品饮料',
        sales: 413,
      },
      {
        date: '1998',
        category: '家居建材',
        sales: 221,
      },
      {
        date: '1998',
        category: '美妆个护',
        sales: 88,
      },
      {
        date: '1998',
        category: '汽车配件',
        sales: 127,
      },
      {
        date: '1998',
        category: '图书文教',
        sales: 117,
      },
      {
        date: '1998',
        category: '运动户外',
        sales: 93,
      },
      {
        date: '1999',
        category: '电子产品',
        sales: 239,
      },
      {
        date: '1999',
        category: '服装鞋帽',
        sales: 275,
      },
      {
        date: '1999',
        category: '食品饮料',
        sales: 472,
      },
      {
        date: '1999',
        category: '家居建材',
        sales: 281,
      },
      {
        date: '1999',
        category: '美妆个护',
        sales: 118,
      },
      {
        date: '1999',
        category: '汽车配件',
        sales: 167,
      },
      {
        date: '1999',
        category: '图书文教',
        sales: 116,
      },
      {
        date: '1999',
        category: '运动户外',
        sales: 118,
      },
      {
        date: '2000',
        category: '电子产品',
        sales: 223,
      },
      {
        date: '2000',
        category: '服装鞋帽',
        sales: 291,
      },
      {
        date: '2000',
        category: '食品饮料',
        sales: 473,
      },
      {
        date: '2000',
        category: '家居建材',
        sales: 228,
      },
      {
        date: '2000',
        category: '美妆个护',
        sales: 126,
      },
      {
        date: '2000',
        category: '汽车配件',
        sales: 141,
      },
      {
        date: '2000',
        category: '图书文教',
        sales: 119,
      },
      {
        date: '2000',
        category: '运动户外',
        sales: 125,
      },
      {
        date: '2001',
        category: '电子产品',
        sales: 257,
      },
      {
        date: '2001',
        category: '服装鞋帽',
        sales: 295,
      },
      {
        date: '2001',
        category: '食品饮料',
        sales: 483,
      },
      {
        date: '2001',
        category: '家居建材',
        sales: 296,
      },
      {
        date: '2001',
        category: '美妆个护',
        sales: 134,
      },
      {
        date: '2001',
        category: '汽车配件',
        sales: 144,
      },
      {
        date: '2001',
        category: '图书文教',
        sales: 122,
      },
      {
        date: '2001',
        category: '运动户外',
        sales: 151,
      },
      {
        date: '2002',
        category: '电子产品',
        sales: 320,
      },
      {
        date: '2002',
        category: '服装鞋帽',
        sales: 364,
      },
      {
        date: '2002',
        category: '食品饮料',
        sales: 564,
      },
      {
        date: '2002',
        category: '家居建材',
        sales: 320,
      },
      {
        date: '2002',
        category: '美妆个护',
        sales: 167,
      },
      {
        date: '2002',
        category: '汽车配件',
        sales: 176,
      },
      {
        date: '2002',
        category: '图书文教',
        sales: 130,
      },
      {
        date: '2002',
        category: '运动户外',
        sales: 163,
      },
      {
        date: '2003',
        category: '电子产品',
        sales: 318,
      },
      {
        date: '2003',
        category: '服装鞋帽',
        sales: 309,
      },
      {
        date: '2003',
        category: '食品饮料',
        sales: 554,
      },
      {
        date: '2003',
        category: '家居建材',
        sales: 343,
      },
      {
        date: '2003',
        category: '美妆个护',
        sales: 172,
      },
      {
        date: '2003',
        category: '汽车配件',
        sales: 194,
      },
      {
        date: '2003',
        category: '图书文教',
        sales: 140,
      },
      {
        date: '2003',
        category: '运动户外',
        sales: 168,
      },
      {
        date: '2004',
        category: '电子产品',
        sales: 341,
      },
      {
        date: '2004',
        category: '服装鞋帽',
        sales: 331,
      },
      {
        date: '2004',
        category: '食品饮料',
        sales: 623,
      },
      {
        date: '2004',
        category: '家居建材',
        sales: 360,
      },
      {
        date: '2004',
        category: '美妆个护',
        sales: 183,
      },
      {
        date: '2004',
        category: '汽车配件',
        sales: 220,
      },
      {
        date: '2004',
        category: '图书文教',
        sales: 146,
      },
      {
        date: '2004',
        category: '运动户外',
        sales: 171,
      },
      {
        date: '2005',
        category: '电子产品',
        sales: 357,
      },
      {
        date: '2005',
        category: '服装鞋帽',
        sales: 374,
      },
      {
        date: '2005',
        category: '食品饮料',
        sales: 623,
      },
      {
        date: '2005',
        category: '家居建材',
        sales: 361,
      },
      {
        date: '2005',
        category: '美妆个护',
        sales: 214,
      },
      {
        date: '2005',
        category: '汽车配件',
        sales: 244,
      },
      {
        date: '2005',
        category: '图书文教',
        sales: 132,
      },
      {
        date: '2005',
        category: '运动户外',
        sales: 198,
      },
      {
        date: '2006',
        category: '电子产品',
        sales: 412,
      },
      {
        date: '2006',
        category: '服装鞋帽',
        sales: 397,
      },
      {
        date: '2006',
        category: '食品饮料',
        sales: 685,
      },
      {
        date: '2006',
        category: '家居建材',
        sales: 363,
      },
      {
        date: '2006',
        category: '美妆个护',
        sales: 225,
      },
      {
        date: '2006',
        category: '汽车配件',
        sales: 229,
      },
      {
        date: '2006',
        category: '图书文教',
        sales: 140,
      },
      {
        date: '2006',
        category: '运动户外',
        sales: 189,
      },
      {
        date: '2007',
        category: '电子产品',
        sales: 470,
      },
      {
        date: '2007',
        category: '服装鞋帽',
        sales: 392,
      },
      {
        date: '2007',
        category: '食品饮料',
        sales: 667,
      },
      {
        date: '2007',
        category: '家居建材',
        sales: 362,
      },
      {
        date: '2007',
        category: '美妆个护',
        sales: 230,
      },
      {
        date: '2007',
        category: '汽车配件',
        sales: 216,
      },
      {
        date: '2007',
        category: '图书文教',
        sales: 148,
      },
      {
        date: '2007',
        category: '运动户外',
        sales: 222,
      },
      {
        date: '2008',
        category: '电子产品',
        sales: 424,
      },
      {
        date: '2008',
        category: '服装鞋帽',
        sales: 373,
      },
      {
        date: '2008',
        category: '食品饮料',
        sales: 668,
      },
      {
        date: '2008',
        category: '家居建材',
        sales: 326,
      },
      {
        date: '2008',
        category: '美妆个护',
        sales: 251,
      },
      {
        date: '2008',
        category: '汽车配件',
        sales: 189,
      },
      {
        date: '2008',
        category: '图书文教',
        sales: 140,
      },
      {
        date: '2008',
        category: '运动户外',
        sales: 217,
      },
      {
        date: '2009',
        category: '电子产品',
        sales: 448,
      },
      {
        date: '2009',
        category: '服装鞋帽',
        sales: 393,
      },
      {
        date: '2009',
        category: '食品饮料',
        sales: 662,
      },
      {
        date: '2009',
        category: '家居建材',
        sales: 312,
      },
      {
        date: '2009',
        category: '美妆个护',
        sales: 265,
      },
      {
        date: '2009',
        category: '汽车配件',
        sales: 277,
      },
      {
        date: '2009',
        category: '图书文教',
        sales: 130,
      },
      {
        date: '2009',
        category: '运动户外',
        sales: 215,
      },
      {
        date: '2010',
        category: '电子产品',
        sales: 623,
      },
      {
        date: '2010',
        category: '服装鞋帽',
        sales: 471,
      },
      {
        date: '2010',
        category: '食品饮料',
        sales: 846,
      },
      {
        date: '2010',
        category: '家居建材',
        sales: 682,
      },
      {
        date: '2010',
        category: '美妆个护',
        sales: 350,
      },
      {
        date: '2010',
        category: '汽车配件',
        sales: 347,
      },
      {
        date: '2010',
        category: '图书文教',
        sales: 160,
      },
      {
        date: '2010',
        category: '运动户外',
        sales: 338,
      },
      {
        date: '2011',
        category: '电子产品',
        sales: 602,
      },
      {
        date: '2011',
        category: '服装鞋帽',
        sales: 463,
      },
      {
        date: '2011',
        category: '食品饮料',
        sales: 882,
      },
      {
        date: '2011',
        category: '家居建材',
        sales: 613,
      },
      {
        date: '2011',
        category: '美妆个护',
        sales: 415,
      },
      {
        date: '2011',
        category: '汽车配件',
        sales: 308,
      },
      {
        date: '2011',
        category: '图书文教',
        sales: 169,
      },
      {
        date: '2011',
        category: '运动户外',
        sales: 341,
      },
      {
        date: '2012',
        category: '电子产品',
        sales: 652,
      },
      {
        date: '2012',
        category: '服装鞋帽',
        sales: 470,
      },
      {
        date: '2012',
        category: '食品饮料',
        sales: 890,
      },
      {
        date: '2012',
        category: '家居建材',
        sales: 563,
      },
      {
        date: '2012',
        category: '美妆个护',
        sales: 425,
      },
      {
        date: '2012',
        category: '汽车配件',
        sales: 360,
      },
      {
        date: '2012',
        category: '图书文教',
        sales: 175,
      },
      {
        date: '2012',
        category: '运动户外',
        sales: 294,
      },
      {
        date: '2013',
        category: '电子产品',
        sales: 739,
      },
      {
        date: '2013',
        category: '服装鞋帽',
        sales: 526,
      },
      {
        date: '2013',
        category: '食品饮料',
        sales: 979,
      },
      {
        date: '2013',
        category: '家居建材',
        sales: 520,
      },
      {
        date: '2013',
        category: '美妆个护',
        sales: 443,
      },
      {
        date: '2013',
        category: '汽车配件',
        sales: 430,
      },
      {
        date: '2013',
        category: '图书文教',
        sales: 179,
      },
      {
        date: '2013',
        category: '运动户外',
        sales: 371,
      },
      {
        date: '2014',
        category: '电子产品',
        sales: 810,
      },
      {
        date: '2014',
        category: '服装鞋帽',
        sales: 481,
      },
      {
        date: '2014',
        category: '食品饮料',
        sales: 1003,
      },
      {
        date: '2014',
        category: '家居建材',
        sales: 597,
      },
      {
        date: '2014',
        category: '美妆个护',
        sales: 508,
      },
      {
        date: '2014',
        category: '汽车配件',
        sales: 472,
      },
      {
        date: '2014',
        category: '图书文教',
        sales: 185,
      },
      {
        date: '2014',
        category: '运动户外',
        sales: 376,
      },
      {
        date: '2015',
        category: '电子产品',
        sales: 810,
      },
      {
        date: '2015',
        category: '服装鞋帽',
        sales: 534,
      },
      {
        date: '2015',
        category: '食品饮料',
        sales: 1037,
      },
      {
        date: '2015',
        category: '家居建材',
        sales: 590,
      },
      {
        date: '2015',
        category: '美妆个护',
        sales: 569,
      },
      {
        date: '2015',
        category: '汽车配件',
        sales: 454,
      },
      {
        date: '2015',
        category: '图书文教',
        sales: 179,
      },
      {
        date: '2015',
        category: '运动户外',
        sales: 411,
      },
      {
        date: '2016',
        category: '电子产品',
        sales: 897,
      },
      {
        date: '2016',
        category: '服装鞋帽',
        sales: 555,
      },
      {
        date: '2016',
        category: '食品饮料',
        sales: 979,
      },
      {
        date: '2016',
        category: '家居建材',
        sales: 713,
      },
      {
        date: '2016',
        category: '美妆个护',
        sales: 568,
      },
      {
        date: '2016',
        category: '汽车配件',
        sales: 470,
      },
      {
        date: '2016',
        category: '图书文教',
        sales: 178,
      },
      {
        date: '2016',
        category: '运动户外',
        sales: 451,
      },
      {
        date: '2017',
        category: '电子产品',
        sales: 954,
      },
      {
        date: '2017',
        category: '服装鞋帽',
        sales: 557,
      },
      {
        date: '2017',
        category: '食品饮料',
        sales: 1122,
      },
      {
        date: '2017',
        category: '家居建材',
        sales: 782,
      },
      {
        date: '2017',
        category: '美妆个护',
        sales: 655,
      },
      {
        date: '2017',
        category: '汽车配件',
        sales: 439,
      },
      {
        date: '2017',
        category: '图书文教',
        sales: 174,
      },
      {
        date: '2017',
        category: '运动户外',
        sales: 481,
      },
      {
        date: '2018',
        category: '电子产品',
        sales: 969,
      },
      {
        date: '2018',
        category: '服装鞋帽',
        sales: 591,
      },
      {
        date: '2018',
        category: '食品饮料',
        sales: 1138,
      },
      {
        date: '2018',
        category: '家居建材',
        sales: 727,
      },
      {
        date: '2018',
        category: '美妆个护',
        sales: 686,
      },
      {
        date: '2018',
        category: '汽车配件',
        sales: 472,
      },
      {
        date: '2018',
        category: '图书文教',
        sales: 190,
      },
      {
        date: '2018',
        category: '运动户外',
        sales: 432,
      },
      {
        date: '2019',
        category: '电子产品',
        sales: 940,
      },
      {
        date: '2019',
        category: '服装鞋帽',
        sales: 615,
      },
      {
        date: '2019',
        category: '食品饮料',
        sales: 1164,
      },
      {
        date: '2019',
        category: '家居建材',
        sales: 718,
      },
      {
        date: '2019',
        category: '美妆个护',
        sales: 846,
      },
      {
        date: '2019',
        category: '汽车配件',
        sales: 548,
      },
      {
        date: '2019',
        category: '图书文教',
        sales: 196,
      },
      {
        date: '2019',
        category: '运动户外',
        sales: 499,
      },
      {
        date: '2020',
        category: '电子产品',
        sales: 1374,
      },
      {
        date: '2020',
        category: '服装鞋帽',
        sales: 637,
      },
      {
        date: '2020',
        category: '食品饮料',
        sales: 1175,
      },
      {
        date: '2020',
        category: '家居建材',
        sales: 782,
      },
      {
        date: '2020',
        category: '美妆个护',
        sales: 766,
      },
      {
        date: '2020',
        category: '汽车配件',
        sales: 446,
      },
      {
        date: '2020',
        category: '图书文教',
        sales: 187,
      },
      {
        date: '2020',
        category: '运动户外',
        sales: 417,
      },
      {
        date: '2021',
        category: '电子产品',
        sales: 1272,
      },
      {
        date: '2021',
        category: '服装鞋帽',
        sales: 746,
      },
      {
        date: '2021',
        category: '食品饮料',
        sales: 1460,
      },
      {
        date: '2021',
        category: '家居建材',
        sales: 1015,
      },
      {
        date: '2021',
        category: '美妆个护',
        sales: 1062,
      },
      {
        date: '2021',
        category: '汽车配件',
        sales: 804,
      },
      {
        date: '2021',
        category: '图书文教',
        sales: 230,
      },
      {
        date: '2021',
        category: '运动户外',
        sales: 867,
      },
      {
        date: '2022',
        category: '电子产品',
        sales: 1159,
      },
      {
        date: '2022',
        category: '服装鞋帽',
        sales: 659,
      },
      {
        date: '2022',
        category: '食品饮料',
        sales: 1455,
      },
      {
        date: '2022',
        category: '家居建材',
        sales: 969,
      },
      {
        date: '2022',
        category: '美妆个护',
        sales: 998,
      },
      {
        date: '2022',
        category: '汽车配件',
        sales: 649,
      },
      {
        date: '2022',
        category: '图书文教',
        sales: 203,
      },
      {
        date: '2022',
        category: '运动户外',
        sales: 760,
      },
      {
        date: '2023',
        category: '电子产品',
        sales: 1523,
      },
      {
        date: '2023',
        category: '服装鞋帽',
        sales: 737,
      },
      {
        date: '2023',
        category: '食品饮料',
        sales: 1511,
      },
      {
        date: '2023',
        category: '家居建材',
        sales: 1014,
      },
      {
        date: '2023',
        category: '美妆个护',
        sales: 1181,
      },
      {
        date: '2023',
        category: '汽车配件',
        sales: 704,
      },
      {
        date: '2023',
        category: '图书文教',
        sales: 235,
      },
      {
        date: '2023',
        category: '运动户外',
        sales: 876,
      },
      {
        date: '2024',
        category: '电子产品',
        sales: 1634,
      },
      {
        date: '2024',
        category: '服装鞋帽',
        sales: 765,
      },
      {
        date: '2024',
        category: '食品饮料',
        sales: 1637,
      },
      {
        date: '2024',
        category: '家居建材',
        sales: 1235,
      },
      {
        date: '2024',
        category: '美妆个护',
        sales: 1432,
      },
      {
        date: '2024',
        category: '汽车配件',
        sales: 788,
      },
      {
        date: '2024',
        category: '图书文教',
        sales: 228,
      },
      {
        date: '2024',
        category: '运动户外',
        sales: 758,
      },
      {
        date: '2025',
        category: '电子产品',
        sales: 2118,
      },
      {
        date: '2025',
        category: '服装鞋帽',
        sales: 868,
      },
      {
        date: '2025',
        category: '食品饮料',
        sales: 1809,
      },
      {
        date: '2025',
        category: '家居建材',
        sales: 1218,
      },
      {
        date: '2025',
        category: '美妆个护',
        sales: 1415,
      },
      {
        date: '2025',
        category: '汽车配件',
        sales: 814,
      },
      {
        date: '2025',
        category: '图书文教',
        sales: 225,
      },
      {
        date: '2025',
        category: '运动户外',
        sales: 974,
      },
      {
        date: '2026',
        category: '电子产品',
        sales: 2087,
      },
      {
        date: '2026',
        category: '服装鞋帽',
        sales: 788,
      },
      {
        date: '2026',
        category: '食品饮料',
        sales: 1694,
      },
      {
        date: '2026',
        category: '家居建材',
        sales: 1267,
      },
      {
        date: '2026',
        category: '美妆个护',
        sales: 1684,
      },
      {
        date: '2026',
        category: '汽车配件',
        sales: 950,
      },
      {
        date: '2026',
        category: '图书文教',
        sales: 209,
      },
      {
        date: '2026',
        category: '运动户外',
        sales: 871,
      },
      {
        date: '2027',
        category: '电子产品',
        sales: 1995,
      },
      {
        date: '2027',
        category: '服装鞋帽',
        sales: 834,
      },
      {
        date: '2027',
        category: '食品饮料',
        sales: 1770,
      },
      {
        date: '2027',
        category: '家居建材',
        sales: 1384,
      },
      {
        date: '2027',
        category: '美妆个护',
        sales: 1586,
      },
      {
        date: '2027',
        category: '汽车配件',
        sales: 815,
      },
      {
        date: '2027',
        category: '图书文教',
        sales: 209,
      },
      {
        date: '2027',
        category: '运动户外',
        sales: 1158,
      },
      {
        date: '2028',
        category: '电子产品',
        sales: 2442,
      },
      {
        date: '2028',
        category: '服装鞋帽',
        sales: 904,
      },
      {
        date: '2028',
        category: '食品饮料',
        sales: 1885,
      },
      {
        date: '2028',
        category: '家居建材',
        sales: 1404,
      },
      {
        date: '2028',
        category: '美妆个护',
        sales: 1775,
      },
      {
        date: '2028',
        category: '汽车配件',
        sales: 999,
      },
      {
        date: '2028',
        category: '图书文教',
        sales: 197,
      },
      {
        date: '2028',
        category: '运动户外',
        sales: 1157,
      },
      {
        date: '2029',
        category: '电子产品',
        sales: 2377,
      },
      {
        date: '2029',
        category: '服装鞋帽',
        sales: 879,
      },
      {
        date: '2029',
        category: '食品饮料',
        sales: 1914,
      },
      {
        date: '2029',
        category: '家居建材',
        sales: 1467,
      },
      {
        date: '2029',
        category: '美妆个护',
        sales: 1840,
      },
      {
        date: '2029',
        category: '汽车配件',
        sales: 1146,
      },
      {
        date: '2029',
        category: '图书文教',
        sales: 220,
      },
      {
        date: '2029',
        category: '运动户外',
        sales: 1156,
      },
      {
        date: '2030',
        category: '电子产品',
        sales: 2749,
      },
      {
        date: '2030',
        category: '服装鞋帽',
        sales: 946,
      },
      {
        date: '2030',
        category: '食品饮料',
        sales: 2126,
      },
      {
        date: '2030',
        category: '家居建材',
        sales: 1774,
      },
      {
        date: '2030',
        category: '美妆个护',
        sales: 1972,
      },
      {
        date: '2030',
        category: '汽车配件',
        sales: 1344,
      },
      {
        date: '2030',
        category: '图书文教',
        sales: 226,
      },
      {
        date: '2030',
        category: '运动户外',
        sales: 1519,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
