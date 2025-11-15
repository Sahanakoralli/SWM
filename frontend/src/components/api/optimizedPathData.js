{
  "data"= {
    "message": "Optimized route found",
    "optimized_order": [
      2,
      0,
      1
    ],
    "legs": [
      {
        "start": "34, Public Garden Rd, Mahaveer Nagar, Halbarga, Brhampur, Kalaburagi, Karnataka 585105, India",
        "end": "8R92+RP9, 13, Chandrabhaga Nagar, Biddapur Colony, Kalaburagi, Karnataka 585103, India",
        "distance": "4.6 km",
        "duration": "13 mins"
      },
      {
        "start": "8R92+RP9, 13, Chandrabhaga Nagar, Biddapur Colony, Kalaburagi, Karnataka 585103, India",
        "end": "Shop No, 5, Sindagi - Kalaburagi Rd, LIG-2, Akkamahadevi Colony, Kalaburagi, Karnataka 585103, India",
        "distance": "1.1 km",
        "duration": "3 mins"
      },
      {
        "start": "Shop No, 5, Sindagi - Kalaburagi Rd, LIG-2, Akkamahadevi Colony, Kalaburagi, Karnataka 585103, India",
        "end": "NH50, LIG-2, Akkamahadevi Colony, Kalaburagi, Karnataka 585107, India",
        "distance": "1.6 km",
        "duration": "5 mins"
      },
      {
        "start": "NH50, LIG-2, Akkamahadevi Colony, Kalaburagi, Karnataka 585107, India",
        "end": "T2, Kuvempu Nagar, Kalaburagi, Karnataka 585105, India",
        "distance": "8.9 km",
        "duration": "18 mins"
      }
    ],
    "polyline": "uuwhBou}sMG|C?xBJdDA`ALpDFxALdB`@|C^|Bh@pBEdFB~B?l@Fj@Hl@`@tB`@~Av@DlBPNFXThCtChAtAf@n@l@l@jEhFbDvDe@h@_CvBkCfC{AdAw@j@wBjBoEvD_DbCaD|BSNFPl@vBv@|CnAnEjAfFd@hC^dCBt@c@`HC`AB^DH@Ph@`@pExB~E~BpJpExCvAbAl@nAjA~BdCfGdG~B~B`B`BDI?E?DEHhBhB`E~DrAtA`ApA@F@HPf@Jh@F`BAlABvFBj@JlA\\`BfBzGlCzJKDJEmC{JiAiEi@uBQ}@KmAEoD?aEGaBKi@Qg@GAEC{BiCg@g@SUREFAJ@`Cn@bATj@F~DPpDN?NARdCDxCE|BKbAKdDe@dCk@ZKAKC[JCnH{BvAe@tAk@hAi@~CoBbCmBd@c@~AeB`B{BhE}Gv@iAfCiEpC_GpBwEt@yBl@}BX}A`@mCPaCNeBJeARkCP_BX}A|AuGbAaFB[CEAMBMHIJE@?LqBbAsJ`BaORgBf@kDxAmJBi@AeA}@iLGwAK{FEyCKiB}@iJg@}HYgFKcAiA{J{@sEc@kCUeCGgAk@iMIwAWyAm@yA{@yAQYaBsB{CmD_DuD}CmDkAaAm@[mAc@cAU{@Io@AsB?]@w@Rg@Bw@CeAMgBa@gCs@mEsA}@SoFoAwD}@eCMgDGs@\\K@SDs@`@y@j@aAd@cBv@{CtA_ChAmBbAmB`A_Ab@s@NoARs@B_DE}EA_DEqCDCbBCr@n@?IlBg@@MhAm@jF?Rp@NfB^DD?TENBFbA`@NV@Hx@LXiA`@{@"
  },
  "status"= 200,
  "statusText"= "OK",
  "headers"= {
    "content-length": "1789",
    "content-type": "application/json; charset=utf-8"
  },
  "config"= {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "adapter": [
      "xhr",
      "http",
      "fetch"
    ],
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {},
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    "method": "post",
    "url": "http://localhost:5000/api/route/optimize",
    "data": "{\"truckLocation\":{\"latitude\":17.3297,\"longitude\":76.8343},\"dumpLocation\":{\"latitude\":17.321,\"longitude\":76.845}}",
    "allowAbsoluteUrls": true
  },
  "request"= {}
}