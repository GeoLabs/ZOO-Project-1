// Filename: app.js
/*
    This work was supported by a grant from the European Union's 7th Framework Programme (2007-2013)
    provided for the project PublicaMundi (GA no. 609608).
*/

require(['bootstrap', 'notify']);

define([
    'module', 'jquery', 'zoo', 'xml2json',
    'hgn!tpl/describe_process',
    'hgn!tpl/get_capabilities',
    'hgn!tpl/execute_response',
    'hgn!tpl/execute_response_async',
], function(module, $, Zoo, X2JS, tpl_describeProcess, tpl_getCapabilities, tpl_executeResponse, tpl_executeResponse_async) {
    
    var zoo = new Zoo({
        url: module.config().url,
        delay: module.config().delay,
    });
    
    var mymodal = $('#myModal');
    var mynotify = $('.top-right');
    
    
    /**
     *
     * Complex payload callback functions
     */
    //
    window.complexPayload_InputPolygon_JSON = function() {
        return '{"type":"Polygon","coordinates":[[[-102.036758,36.988972],[-106.860657,36.989491],[-109.047821,36.996643],[-109.055199,38.24493],[-109.052864,39.518196],[-109.050591,40.210545],[-109.047638,40.998474],[-107.918037,41.00341],[-104.051201,41.003227],[-102.620789,41.000225],[-102.047279,40.998077],[-102.04557,40.697323],[-102.036758,36.988972]]]}';
    }

    window.complexPayload_InputPolygon_GML = function() {
        return '<wfs:FeatureCollection xmlns="http://www.opengis.net/wfs" xmlns:wfs="http://www.opengis.net/wfs" xmlns:topp="http://www.openplans.org/topp" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openplans.org/topp http://www.zoo-project.org:8082/geoserver/wfs?service=WFS&amp;version=1.0.0&amp;request=DescribeFeatureType&amp;typeName=topp%3Astates http://www.opengis.net/wfs http://www.zoo-project.org:8082/geoserver/schemas/wfs/1.0.0/WFS-basic.xsd"><gml:boundedBy><gml:null>unknown</gml:null></gml:boundedBy><gml:featureMember><topp:states fid="states.15"><topp:the_geom><gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#4326"><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-105.99836,31.393818 -106.212753,31.478128 -106.383041,31.733763 -106.538971,31.786198 -106.614441,31.817728 -106.615578,31.844635 -106.643532,31.895102 -106.633202,31.913998 -106.632057,31.972118 -106.649513,31.980228 -106.623077,32.000988 -106.377846,32.000645 -106.002708,32.001553 -104.921799,32.004269 -104.850563,32.003151 -104.018814,32.007278 -103.980896,32.00589 -103.728973,32.006104 -103.332092,32.004154 -103.057968,32.0019 -103.055191,32.084995 -103.059547,32.51543 -103.048836,32.953533 -103.042603,33.377728 -103.038239,33.565742 -103.032761,33.826088 -103.029144,34.307743 -103.022156,34.745266 -103.02475,34.964718 -103.02565,35.177208 -103.021797,35.623604 -103.022118,35.742287 -103.02356,36.056026 -103.026802,36.491566 -102.996918,36.492344 -102.165222,36.490208 -102.03421,36.492954 -101.620316,36.492004 -101.089668,36.488022 -100.956909,36.489609 -100.549416,36.489449 -100.006866,36.493877 -100.001144,36.492519 -99.997154,36.057549 -99.997726,35.883793 -100,35.618809 -99.994354,35.424572 -99.997185,35.182182 -99.996071,35.030998 -99.998878,34.747185 -99.996094,34.562321 -99.972099,34.561863 -99.94474,34.579571 -99.931908,34.579109 -99.8806,34.548176 -99.860573,34.518627 -99.829933,34.501778 -99.777687,34.443993 -99.684906,34.377445 -99.601448,34.368557 -99.58522,34.384857 -99.57785,34.408913 -99.553864,34.41518 -99.502136,34.404068 -99.479439,34.383522 -99.438377,34.364704 -99.409958,34.369106 -99.394157,34.396744 -99.392792,34.428993 -99.364204,34.450195 -99.323296,34.412708 -99.267174,34.398285 -99.254105,34.368214 -99.20549,34.331993 -99.196304,34.305122 -99.204597,34.255646 -99.190483,34.223736 -99.176155,34.21273 -99.127945,34.201469 -99.07843,34.208359 -99.035217,34.198921 -98.996193,34.209496 -98.952507,34.194565 -98.891342,34.16082 -98.811066,34.145935 -98.778534,34.131962 -98.705292,34.130714 -98.682213,34.149998 -98.66172,34.147038 -98.625992,34.158436 -98.607246,34.151398 -98.576332,34.14193 -98.557579,34.105335 -98.499519,34.066414 -98.448189,34.054375 -98.421341,34.06583 -98.407135,34.082455 -98.390953,34.087231 -98.384254,34.11578 -98.350403,34.14212 -98.320488,34.13942 -98.277,34.122871 -98.172844,34.115368 -98.136864,34.138432 -98.114868,34.148987 -98.094124,34.134556 -98.110687,34.06982 -98.086205,34.005314 -98.055557,33.989799 -98.023491,33.986984 -97.982681,34.001286 -97.950226,33.971161 -97.947754,33.959751 -97.962997,33.94865 -97.950684,33.932518 -97.976128,33.912052 -97.976379,33.902504 -97.954735,33.88348 -97.909065,33.874023 -97.869751,33.855114 -97.852547,33.857071 -97.790207,33.890457 -97.756363,33.932098 -97.729019,33.939293 -97.704262,33.971546 -97.671066,33.988613 -97.600182,33.969437 -97.592354,33.917885 -97.575668,33.902531 -97.554588,33.903904 -97.518204,33.916771 -97.477531,33.907707 -97.462761,33.902382 -97.457062,33.89043 -97.452736,33.836212 -97.410118,33.820709 -97.363319,33.831024 -97.341805,33.861916 -97.314957,33.870392 -97.314087,33.89584 -97.272278,33.872574 -97.263908,33.85873 -97.250687,33.872971 -97.246063,33.894238 -97.211334,33.905689 -97.187767,33.899204 -97.164169,33.863148 -97.168594,33.847794 -97.195015,33.836159 -97.208321,33.819649 -97.189163,33.752769 -97.152473,33.728668 -97.115562,33.725933 -97.0905,33.73167 -97.083466,33.742413 -97.087669,33.807571 -97.050026,33.823448 -97.078247,33.837811 -97.082176,33.851101 -97.0709,33.856728 -97.025597,33.840561 -97.005852,33.850513 -96.987709,33.876423 -96.987862,33.944202 -96.968185,33.937321 -96.936203,33.947849 -96.929565,33.961773 -96.898453,33.950027 -96.882851,33.924591 -96.878937,33.884003 -96.861015,33.861679 -96.844009,33.858032 -96.814117,33.871769 -96.797592,33.869949 -96.748825,33.831738 -96.711678,33.83387 -96.693382,33.847904 -96.677704,33.904324 -96.666237,33.913544 -96.584488,33.896145 -96.614166,33.8629 -96.601196,33.842957 -96.562134,33.82542 -96.510574,33.815685 -96.500748,33.78809 -96.487373,33.77813 -96.419464,33.788326 -96.370819,33.740395 -96.347588,33.705528 -96.316277,33.701801 -96.300789,33.71405 -96.28968,33.761932 -96.278076,33.773388 -96.212547,33.756691 -96.187027,33.758583 -96.168816,33.769356 -96.161316,33.798229 -96.141418,33.82032 -96.154518,33.823944 -96.180725,33.808434 -96.183128,33.815792 -96.169205,33.828983 -96.148964,33.83559 -96.109444,33.829258 -96.091522,33.844578 -96.047974,33.841278 -96.026749,33.856022 -96.014069,33.844208 -96.001793,33.856979 -96.002617,33.87339 -95.994209,33.875378 -95.977394,33.857952 -95.958763,33.86504 -95.943069,33.889973 -95.933075,33.89053 -95.846558,33.841038 -95.825974,33.843025 -95.795479,33.864674 -95.768517,33.851402 -95.764252,33.879005 -95.760696,33.89344 -95.746864,33.903397 -95.699707,33.894825 -95.633492,33.920105 -95.612984,33.920238 -95.61483,33.936691 -95.606071,33.944553 -95.562775,33.936073 -95.546318,33.904034 -95.519577,33.906643 -95.526733,33.897816 -95.547493,33.893158 -95.544037,33.885742 -95.512886,33.897736 -95.498856,33.881718 -95.468124,33.886433 -95.451607,33.865753 -95.33004,33.870918 -95.336227,33.897114 -95.301956,33.886623 -95.28643,33.886902 -95.277351,33.917938 -95.263618,33.8978 -95.250992,33.905022 -95.251289,33.936443 -95.234039,33.964863 -95.148315,33.943546 -95.127968,33.940868 -95.126678,33.917145 -95.119225,33.912281 -95.09536,33.921738 -95.082268,33.918453 -95.089714,33.896915 -95.083603,33.888462 -95.063477,33.917648 -95.063141,33.896694 -95.042862,33.884445 -95.037361,33.866451 -95.012772,33.869946 -94.989281,33.856182 -94.968704,33.866215 -94.959908,33.848076 -94.939888,33.840824 -94.940399,33.815807 -94.918236,33.816196 -94.908546,33.803478 -94.913879,33.789597 -94.881638,33.774963 -94.85788,33.749321 -94.81916,33.749405 -94.803223,33.739582 -94.783508,33.753262 -94.764175,33.752842 -94.782028,33.742268 -94.783157,33.733665 -94.749771,33.736706 -94.762718,33.716797 -94.742111,33.719048 -94.754478,33.707771 -94.741653,33.701267 -94.690987,33.690289 -94.668457,33.696537 -94.655479,33.692291 -94.644325,33.67765 -94.667953,33.671459 -94.669426,33.666061 -94.658539,33.663738 -94.638763,33.670105 -94.631737,33.683899 -94.600945,33.665607 -94.585106,33.678982 -94.578506,33.670471 -94.560722,33.671913 -94.565208,33.663013 -94.585159,33.662132 -94.588387,33.655449 -94.576462,33.652157 -94.545418,33.661621 -94.541931,33.648247 -94.562195,33.64283 -94.562149,33.635536 -94.550194,33.632694 -94.51799,33.643009 -94.525055,33.621021 -94.510559,33.63081 -94.50061,33.623047 -94.476486,33.631966 -94.435913,33.636444 -94.436333,33.616844 -94.451553,33.604347 -94.443329,33.596504 -94.428467,33.597141 -94.40657,33.573486 -94.393417,33.574959 -94.379112,33.593327 -94.370628,33.590042 -94.372307,33.572662 -94.395264,33.560303 -94.370758,33.547684 -94.328751,33.573135 -94.302383,33.556934 -94.29882,33.579853 -94.278984,33.589333 -94.272079,33.584606 -94.274544,33.561737 -94.237236,33.592422 -94.223038,33.58572 -94.235367,33.561535 -94.210884,33.557987 -94.205345,33.585079 -94.159515,33.593773 -94.155167,33.567085 -94.098701,33.572998 -94.086655,33.583954 -94.061432,33.577213 -94.035927,33.555912 -94.036507,33.270325 -94.03875,33.023289 -94.041603,32.882347 -94.040199,32.694813 -94.035233,32.389225 -94.034767,32.199448 -94.035065,31.994513 -94.009888,31.989134 -94.004395,31.977942 -93.977211,31.946159 -93.969986,31.923164 -93.93573,31.909456 -93.917923,31.909702 -93.923462,31.892593 -93.899261,31.894455 -93.892525,31.870066 -93.881264,31.87142 -93.877403,31.850113 -93.864822,31.817272 -93.834328,31.802017 -93.822067,31.774637 -93.831161,31.753281 -93.80999,31.730352 -93.814949,31.712351 -93.808769,31.707565 -93.792267,31.711395 -93.811844,31.674566 -93.806427,31.653767 -93.814728,31.647966 -93.819588,31.618092 -93.835579,31.615189 -93.832619,31.590183 -93.816322,31.57711 -93.810516,31.559063 -93.780128,31.533735 -93.763306,31.530724 -93.747543,31.537718 -93.731659,31.521877 -93.705795,31.520569 -93.718994,31.495403 -93.750435,31.490557 -93.751244,31.4855 -93.726784,31.459475 -93.698418,31.461458 -93.701927,31.446251 -93.687004,31.438131 -93.696129,31.427736 -93.694443,31.415922 -93.687492,31.40613 -93.664017,31.398329 -93.661072,31.372395 -93.634857,31.373827 -93.67704,31.328386 -93.681587,31.312679 -93.656128,31.286671 -93.645592,31.290262 -93.630829,31.273903 -93.616455,31.275805 -93.611877,31.270033 -93.611,31.242188 -93.590546,31.229687 -93.602921,31.199066 -93.593941,31.180199 -93.576942,31.17214 -93.550591,31.190929 -93.528923,31.185774 -93.526932,31.178076 -93.537018,31.17634 -93.528328,31.162943 -93.544189,31.159166 -93.537506,31.132441 -93.528091,31.125925 -93.535088,31.116072 -93.556679,31.109343 -93.559982,31.100536 -93.543121,31.094751 -93.544106,31.082373 -93.516998,31.074671 -93.525742,31.05698 -93.507217,31.038908 -93.547119,31.014141 -93.564941,31.018063 -93.567894,31.012924 -93.570847,30.997271 -93.560951,30.99169 -93.572456,30.976177 -93.548676,30.97019 -93.537338,30.956884 -93.532188,30.960732 -93.52562,30.93582 -93.529984,30.926971 -93.549622,30.924885 -93.546516,30.905334 -93.564476,30.901932 -93.568497,30.886234 -93.560844,30.87188 -93.552803,30.860283 -93.566444,30.845148 -93.555641,30.842342 -93.550682,30.828344 -93.581871,30.80204 -93.585175,30.772184 -93.618454,30.745789 -93.607651,30.73201 -93.61779,30.732548 -93.612411,30.710329 -93.617607,30.686802 -93.659988,30.672859 -93.677971,30.639692 -93.692879,30.640041 -93.684586,30.623425 -93.692696,30.615795 -93.671585,30.597832 -93.69342,30.598835 -93.717812,30.587379 -93.71788,30.568153 -93.735306,30.545517 -93.70546,30.522858 -93.714638,30.505114 -93.707275,30.496241 -93.714851,30.488628 -93.697975,30.470047 -93.703423,30.462513 -93.696571,30.442633 -93.721535,30.43298 -93.742561,30.408823 -93.754944,30.381788 -93.747833,30.367411 -93.759338,30.354145 -93.759178,30.340872 -93.729774,30.304916 -93.699211,30.297388 -93.707359,30.239372 -93.714844,30.220306 -93.704361,30.180861 -93.696167,30.175676 -93.699661,30.150808 -93.683144,30.148232 -93.685959,30.141253 -93.698639,30.141226 -93.696922,30.117929 -93.708382,30.11474 -93.715858,30.095669 -93.712479,30.06052 -93.760201,30.005964 -93.857277,29.990654 -93.856331,29.964602 -93.951767,29.818363 -93.834961,29.67457 -94.065407,29.674076 -94.356995,29.5599 -94.377007,29.55197 -94.682518,29.432905 -94.766548,29.363993 -94.785248,29.383261 -94.681915,29.475111 -94.572693,29.533052 -94.501282,29.517523 -94.469795,29.55678 -94.510811,29.545147 -94.533699,29.553984 -94.564438,29.578999 -94.788086,29.538557 -94.706421,29.658516 -94.700279,29.754568 -94.735725,29.792986 -94.829414,29.759857 -94.887161,29.668539 -94.932587,29.682209 -95.088264,29.80398 -95.040398,29.711578 -94.989334,29.679701 -95.014122,29.559265 -94.911156,29.500334 -94.982811,29.460527 -94.943756,29.464682 -94.952507,29.424234 -94.913445,29.420113 -94.916992,29.447823 -94.891136,29.399324 -94.815353,29.370932 -94.891472,29.393831 -94.898788,29.308775 -94.951134,29.325922 -95.066368,29.195877 -95.160522,29.200031 -95.16478,29.117548 -95.197342,29.105223 -95.248405,28.978392 -95.526581,28.803242 -95.683029,28.726954 -95.671318,28.752682 -95.786354,28.738871 -95.937309,28.690454 -95.956146,28.622673 -95.702148,28.718987 -96.206581,28.488386 -95.991646,28.596424 -95.983749,28.653133 -96.237587,28.571321 -96.239029,28.597116 -96.157471,28.611231 -96.240456,28.634859 -96.151062,28.762672 -96.212173,28.68672 -96.285973,28.661724 -96.270378,28.708981 -96.326157,28.634089 -96.364159,28.617981 -96.391777,28.670252 -96.392731,28.726028 -96.427086,28.712013 -96.449677,28.755035 -96.432259,28.697248 -96.403397,28.719494 -96.418785,28.638664 -96.375397,28.610088 -96.491203,28.556944 -96.437157,28.596991 -96.454384,28.655933 -96.483269,28.598055 -96.511894,28.608181 -96.511734,28.649542 -96.570396,28.636267 -96.570557,28.691841 -96.572212,28.808174 -96.576485,28.690689 -96.591499,28.71736 -96.646515,28.714142 -96.660011,28.679075 -96.606705,28.623634 -96.610344,28.558941 -96.566704,28.574099 -96.48658,28.506222 -96.563194,28.469627 -96.518501,28.460827 -96.476501,28.499454 -96.390724,28.434059 -96.661308,28.306263 -96.702362,28.340197 -96.703812,28.395885 -96.740768,28.403458 -96.787094,28.477507 -96.823875,28.44964 -96.788338,28.446255 -96.759102,28.410912 -96.77536,28.39163 -96.853493,28.404997 -96.788231,28.35247 -96.78627,28.312859 -96.793335,28.271372 -96.777931,28.229349 -96.803688,28.211447 -96.950905,28.114355 -96.91272,28.256798 -96.975304,28.210751 -96.941071,28.186771 -96.975105,28.115046 -97.033615,28.137398 -97.023567,28.199797 -97.131836,28.130426 -97.135414,28.16181 -97.167992,28.15946 -97.157059,28.116381 -97.260284,28.064724 -97.241234,28.048653 -97.270294,28.025932 -97.236214,28.04052 -97.123077,28.054266 -97.026405,28.10775 -97.023804,28.020237 -97.114624,27.915386 -97.195465,27.81222 -97.247025,27.822319 -97.213341,27.83111 -97.283485,27.871145 -97.361046,27.839954 -97.345619,27.873178 -97.479355,27.852962 -97.496681,27.875469 -97.521698,27.863626 -97.499535,27.843243 -97.479813,27.820282 -97.388542,27.831427 -97.396561,27.77084 -97.317795,27.712225 -97.34951,27.715328 -97.320015,27.690634 -97.353363,27.6408 -97.399216,27.633186 -97.347504,27.631439 -97.309212,27.707863 -97.249794,27.688831 -97.331459,27.562321 -97.412262,27.321024 -97.500435,27.319668 -97.507538,27.439215 -97.528381,27.344101 -97.600113,27.300135 -97.750076,27.419666 -97.680008,27.294373 -97.784744,27.28772 -97.548157,27.230207 -97.427216,27.265133 -97.503502,27.081541 -97.478996,26.996508 -97.568565,26.977858 -97.558052,26.846052 -97.495575,26.793781 -97.451698,26.600985 -97.425858,26.518225 -97.474709,26.476805 -97.421188,26.385059 -97.368698,26.35906 -97.353363,26.182449 -97.25312,26.068316 -97.276321,26.002275 -97.213097,26.009068 -97.172226,25.954569 -97.307144,25.965124 -97.304436,25.938663 -97.380989,25.917021 -97.385643,25.845362 -97.434349,25.845198 -97.590088,25.933231 -97.574936,25.954172 -97.612923,25.962002 -97.647972,26.023445 -97.867432,26.060141 -98.04007,26.059395 -98.076347,26.034626 -98.083214,26.065758 -98.200691,26.055376 -98.291946,26.098104 -98.271355,26.120895 -98.292274,26.132809 -98.327934,26.111647 -98.347191,26.15868 -98.384521,26.156031 -98.453392,26.220911 -98.488518,26.201544 -98.599968,26.260454 -98.677917,26.242056 -98.819832,26.375071 -98.908897,26.360329 -98.93927,26.395309 -99.106728,26.419531 -99.101471,26.48834 -99.168678,26.545729 -99.165817,26.579889 -99.285522,26.857361 -99.390518,26.94663 -99.392715,26.99555 -99.455063,27.028648 -99.437157,27.199198 -99.465271,27.269884 -99.543587,27.318653 -99.490494,27.490755 -99.526741,27.504284 -99.549187,27.612627 -99.714493,27.661558 -99.815727,27.780107 -99.874733,27.797686 -99.941856,27.986881 -99.993309,28.00346 -100.096924,28.154282 -100.214073,28.201935 -100.223465,28.241457 -100.29792,28.280354 -100.292892,28.32036 -100.35157,28.394182 -100.37677,28.478651 -100.345802,28.500811 -100.419533,28.544191 -100.403175,28.589733 -100.49791,28.660988 -100.58979,28.894222 -100.647224,28.92235 -100.66877,29.080072 -100.768608,29.166571 -100.796989,29.242502 -101.009056,29.373255 -101.06736,29.473553 -101.261429,29.526474 -101.254585,29.62875 -101.308929,29.58091 -101.305862,29.652431 -101.368401,29.657162 -101.4161,29.745434 -101.401276,29.769905 -101.448425,29.760586 -101.470467,29.788691 -101.538345,29.763018 -101.543953,29.81012 -101.58149,29.76515 -101.639671,29.75696 -101.759094,29.787167 -101.805206,29.779999 -101.819099,29.814125 -101.924225,29.788502 -101.97332,29.818773 -102.063995,29.784571 -102.324333,29.880116 -102.367561,29.845289 -102.384796,29.767946 -102.503098,29.785456 -102.551949,29.7495 -102.5765,29.778248 -102.637611,29.732338 -102.676361,29.744225 -102.804726,29.530146 -102.822205,29.411844 -102.883011,29.353371 -102.908325,29.269203 -102.866173,29.229036 -102.988098,29.190863 -103.153465,28.978682 -103.266586,29.007454 -103.28035,28.986374 -103.335518,29.050339 -103.37545,29.032108 -103.474075,29.072134 -103.526237,29.146646 -103.720314,29.190632 -103.739853,29.230349 -103.782158,29.229795 -103.767761,29.28124 -103.786995,29.26726 -104.045631,29.328119 -104.164383,29.400715 -104.204735,29.484041 -104.377594,29.550611 -104.535248,29.679466 -104.57756,29.807936 -104.67437,29.909283 -104.696495,30.057302 -104.674759,30.148964 -104.702614,30.238489 -104.813957,30.35047 -104.806473,30.376448 -104.852997,30.392263 -104.890678,30.570557 -104.986931,30.641325 -104.997543,30.684334 -105.060562,30.68787 -105.21434,30.812086 -105.258186,30.797653 -105.287598,30.831949 -105.313782,30.816507 -105.390312,30.853081 -105.409065,30.90251 -105.554382,30.998285 -105.603218,31.086428 -105.76973,31.17078 -105.99836,31.393818</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-94.913429,29.257572 -94.76738,29.342451 -94.748405,29.31949 -95.105415,29.096958 -94.913429,29.257572</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-96.397881,28.345846 -96.834625,28.066322 -96.803841,28.172161 -96.738907,28.183535 -96.532135,28.318245 -96.463051,28.325832 -96.422554,28.391439 -96.397881,28.345846</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-96.939964,28.045933 -96.872421,28.131405 -96.837425,28.101841 -96.853806,28.049402 -97.049606,27.840954 -97.024429,27.914381 -96.949387,27.984526 -96.973,28.000853 -96.939964,28.045933</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-97.359116,27.283718 -97.379379,27.210453 -97.376091,27.284643 -97.335503,27.440819 -97.248672,27.581133 -97.258682,27.651749 -97.203583,27.612064 -97.170181,27.70746 -97.075294,27.811274 -97.113037,27.819216 -97.053566,27.830473 -97.223717,27.574007 -97.359116,27.283718</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">-97.301132,26.601023 -97.358025,26.706646 -97.381332,26.820375 -97.395309,26.921988 -97.400909,27.111227 -97.388786,27.201651 -97.378532,27.204449 -97.386925,27.097244 -97.381332,26.949022 -97.358025,26.802664 -97.295837,26.60067 -97.232109,26.418142 -97.194992,26.259241 -97.171799,26.077721 -97.179337,26.07192 -97.208916,26.250542 -97.226311,26.348551 -97.251251,26.419304 -97.26725,26.478905 -97.278549,26.539963 -97.301132,26.601023</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon></topp:the_geom><topp:STATE_NAME>Texas</topp:STATE_NAME><topp:STATE_FIPS>48</topp:STATE_FIPS><topp:SUB_REGION>W S Cen</topp:SUB_REGION><topp:STATE_ABBR>TX</topp:STATE_ABBR><topp:LAND_KM>688219.07</topp:LAND_KM><topp:WATER_KM>17337.549</topp:WATER_KM><topp:PERSONS>1.712202E7</topp:PERSONS><topp:FAMILIES>4377106.0</topp:FAMILIES><topp:HOUSHOLD>6115966.0</topp:HOUSHOLD><topp:MALE>8433346.00000001</topp:MALE><topp:FEMALE>8688674.0</topp:FEMALE><topp:WORKERS>6192585.0</topp:WORKERS><topp:DRVALONE>5860490.0</topp:DRVALONE><topp:CARPOOL>1142908.0</topp:CARPOOL><topp:PUBTRANS>168814.0</topp:PUBTRANS><topp:EMPLOYED>7687338.0</topp:EMPLOYED><topp:UNEMPLOY>590269.0</topp:UNEMPLOY><topp:SERVICE>2139266.0</topp:SERVICE><topp:MANUAL>1042397.0</topp:MANUAL><topp:P_MALE>0.493</topp:P_MALE><topp:P_FEMALE>0.507</topp:P_FEMALE><topp:SAMP_POP>2487642.0</topp:SAMP_POP></topp:states></gml:featureMember></wfs:FeatureCollection>';
    }

    window.complexPayload_GML = function() {
        return '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" service="WFS" version="1.1.0" maxFeatures="10" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><wfs:Query typeName="states" srsName="EPSG:4326"><ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:BBOX><ogc:PropertyName>the_geom</ogc:PropertyName><gml:Envelope xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326"><gml:lowerCorner>-98.417969 29.498046625</gml:lowerCorner><gml:upperCorner>-97.53906275 30.376952875</gml:upperCorner></gml:Envelope></ogc:BBOX></ogc:Filter></wfs:Query></wfs:GetFeature>';
    }


    function notify(text, type) {
        mynotify.notify({
            message: { text: text },
            type: type,
        }).show();
    }
    
    function showModal(title, body) {
        mymodal.find('.modal-body').text('');
        mymodal.find('.modal-body').append(body);
        mymodal.find('.modal-title').text(title);
        var options = {};
        mymodal.modal(options);
    }

    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    
    var map, layer, select, hover_, hover, multi, control,mapControls;
    var wgs84,mercator;
    var main_url="http://localhost/cgi-bin/mapserv?map=/var/data/maps/project_WS2016_1.map";
    var zoo_url="http://localhost/cgi-bin/zoo_loader.cgi";
    var typename="ways";
    var request1=null;
    var hasSimpleChain=false;
    var activatedServices={
	Mask: false,
	BufferMask: false,
	BufferRequest: false,
	BufferRequestAndMask: false
    };


    var pop;

    function onPopupClose(){
	if(pop)
	    map.removePopup(pop);
    }

    function createPopup(){
	var tmp=arguments[0].geometry.getCentroid();
	if(pop)
	    map.removePopup(pop);
	var attrs='<div style="color: #000;"><table>';
	for(var i in arguments[0].data)
	    if(i!="gml_id")
		attrs+="<tr><td width='100' style='font-weight: bold;'>"+i+"</td><td>"+arguments[0].data[i]+"</td></tr>";
	attrs+="</table></div>";
	pop=new OpenLayers.Popup.FramedCloud("Information",
					     arguments[0].geometry.getBounds().getCenterLonLat(),
					     new OpenLayers.Size(100,100),
					     "<h2>"+arguments[0].data.name+"</h2>"+attrs,
					     null, true,onPopupClose);
	map.addPopup(pop);
    }
    
    function unSelect(){
	if(pop)
	    map.removePopup(pop);
	//alert(arguments[0]);
    }

    function parseMapServerId(){
	try{
	    var sf=arguments[0].split(".");
	    return sf[0]+"."+sf[1].replace(/ /g,'');
	}catch(e){}
    }

    function toggleControl(element) {
	for(key in mapControls) {
	    var control = mapControls[key];
	    //alert ($(element).is('.ui-state-active'));
	    if(element.name == key && $(element).is('.ui-state-active')) {
		control.activate();
	    } else {
		control.deactivate();
	    }
	}
    }

    function restartDisplay(){
	var tmp=[select,hover_,hover,multi];
	for(i=0;i<tmp.length;i++)
	    if(tmp[i].features.length>=1)
		tmp[i].removeFeatures(tmp[i].features);
	slist=$(".single-process:not(.ui-state-disabled)");
	for(var i=0;i<slist.length;i++)
	    slist[i].style.display='none';
	mlist=$(".multi-process:not(.ui-state-disabled)");
	for(var i=0;i<mlist.length;i++)
	    mlist[i].style.display='none';
    }

    function singleProcessing(aProcess) {
	if (select.features.length == 0)
	    return alert("No feature selected!");
	if(multi.features.length>=1)
  	    multi.removeFeatures(multi.features);
	var started=true;
	var dep=hover;
	if(arguments.length>1){
	    dep=arguments[1];
	    started=false;
	}
	var xlink = control.protocol.url +"&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.0.0";
	xlink += '&typename='+control.protocol.featurePrefix;
	xlink += ':'+control.protocol.featureType;
	xlink += '&SRS='+control.protocol.srsName;
	xlink += '&FeatureID='+parseMapServerId(select.features[0].fid);
	var inputs=[{"identifier":"InputPolygon","href":xlink,"mimeType":"text/xml"}];

	var isChain2=false;
	if(aProcess=="SimpleChain2"){
	    aProcess="BufferRequest";
	    isChain2=true;
	}

	for(var i in activatedServices)
	    if(aProcess==i){
		inputs[0].identifier="InputData";
		break;
	    }
	if (aProcess == 'Buffer' || aProcess == 'BufferPy') {
	    inputs.push({"identifier":"BufferDistance","value":"0.001","dataType":"integer"})
	}

	    
	/*var my_request=zoo.getRequest({identifier: aProcess,
				       dataInputs: inputs,
				       dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
				       type: 'POST',
				       storeExecuteResponse: false});

	var my_request1=zoo.getRequest({identifier: aProcess,
					dataInputs: [{"identifier":"InputPolygon","complexPayload": my_request.data,"href":my_request.url,"headers":[{"key":"Content-Type","value":"text/xml"}],"method": "POST","mimeType":"text/xml"}],
				       dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
				       type: 'POST',
				       storeExecuteResponse: false});

	alert(my_request1.data);
	console.log(my_request);*/
	console.log(inputs);
        zoo.execute({
            identifier: aProcess,
            dataInputs: inputs,
            dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
            type: 'POST',
            storeExecuteResponse: false,
            success: function(data) {
		notify('Execute succeded', 'success');
		console.log(data);
		var GeoJSON = new OpenLayers.Format.GeoJSON();
		var features = GeoJSON.read(JSON.stringify(data));
		console.log(features);
		dep.removeFeatures(dep.features);
		if(aProcess!="SimpleChain1" && aProcess!="SimpleChain2"
		   && aProcess!="BufferRequest")
		    if(dep!=hover_)
			hover_.removeFeatures(hover_.features);
		for(var j in features){
		    features[j].geometry=features[j].geometry.transform(wgs84,mercator);
		}
		dep.addFeatures(features);
            },
            error: function(data) {
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });
		
	if(isChain2 && started)
	    singleProcessing("BufferMask",hover_);
	
    }

    function multiProcessing(aProcess) {
	if (select.features.length == 0 || hover.features.length == 0)
	    return alert("No feature created!");

	var xlink = control.protocol.url +"&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.0.0";
	xlink += '&typename='+control.protocol.featurePrefix;
	xlink += ':'+control.protocol.featureType;
	xlink += '&SRS='+control.protocol.srsName;
	xlink += '&FeatureID='+select.features[0].fid;
	var GeoJSON = new OpenLayers.Format.GeoJSON();
	lfeatures=[];
	for(var i in hover.features){
	    lfeatures.push(hover.features[i].clone());
	    lfeatures[i].geometry=lfeatures[i].geometry.transform(mercator,wgs84);
	}
	var inputs=[{"identifier":"InputEntity1","href":xlink,"mimeType":"text/xml"},
		   {"identifier":"InputEntity2","value":GeoJSON.write(lfeatures),"mimeType":"application/json"}];

        zoo.execute({
            identifier: aProcess,
            dataInputs: inputs,
            dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
            type: 'POST',
            storeExecuteResponse: false,
            success: function(data) {
		notify('Execute succeded', 'success');
		console.log(data);
		var GeoJSON = new OpenLayers.Format.GeoJSON();
		var features = GeoJSON.read(JSON.stringify(data));
		if(multi.features)
		    multi.removeFeatures(multi.features);
		for(var j in features){
		    features[j].geometry=features[j].geometry.transform(wgs84,mercator);
		}
		multi.addFeatures(features);
            },
            error: function(data) {
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });

    }
    
    function activateService(){
	try{
	    $("#buttonBar").append('<a href="#" class="fg-button ui-state-default ui-text-only ui-corner-all single-process process" title="'+(arguments[0]!="SimpleChain2"?arguments[0]:"BufferRequestAndMask")+'" name="'+(arguments[0]!="SimpleChain2"?arguments[0]:"BufferRequestAndMask")+'" onclick="app.singleProcessing(\''+(arguments[0]!="SimpleChain2"?arguments[0]:"SimpleChain2")+'\');"> '+(arguments[0]!="SimpleChain2" && arguments[0]!="BufferMask" && arguments[0]!="BufferRequest"?arguments[0]:(arguments[0]!="BufferMask" && arguments[0]!="BufferRequest"?"Buffer Request and Mask":arguments[0]!="BufferRequest"?"Buffer Mask":"Buffer Request"))+' </a>');
	    
	    elist=$('.process');
	    for(var i=0;i<elist.length;i++){
		elist[i].style.display='none';
	    }
	    
	}catch(e){
	    alert(e);
	}
    }


    
    //
    var initialize = function() {
        self = this;        
        
        // DescribeProcess button
        $('.btn.describeprocess').on('click', function(e) {
            e.preventDefault();
            self.describeProcess(this.dataset);
        });
        
        // GetCapabilities button
        $('.btn.getcapabilities').on('click', function(e) {
            e.preventDefault();
            self.getCapabilities(this.dataset);
        });
        
        // Execute synchrone button
        $('.btn.executesynchrone').on('click', function(e) {
            e.preventDefault();
            self.executeSynchrone(this.dataset);
        });
        
        // Launch executeasynchrone button
        $('.btn.executeasynchrone').on('click', function(e) {
            e.preventDefault();
            self.executeAsynchrone(this.dataset);
        });
        
        // Launch longProcess button
        $('.btn.longprocess').on('click', function(e) {
            e.preventDefault();
            self.longProcessDemo(this.dataset);
        });
        
        
        // Misc tests
        $('.btn.testalert').on('click', function(e) {
          e.preventDefault();
          var type = this.dataset.type;
          notify('This is a message.', type);
        });

	zoo.getCapabilities({
	    type: 'POST',
	    success: function(data){
		var processes=data["Capabilities"]["ProcessOfferings"]["Process"];
		for(var i in activatedServices){
		    for(var j=0;j<processes.length;j++)
			if(i==processes[j].Identifier){
			    activateService(i);
			    activatedServices[i]=true;
			    if(activatedServices["BufferRequest"] && activatedServices["BufferMask"] && !hasSimpleChain){
				activateService("SimpleChain2");
				activatedServices["BufferRequestAndMask"]=true;
				hasSimpleChain=true;
			    }
			    if(i=="BufferMask")
				if(activatedServices["BufferRequest"]){
				    activateService("SimpleChain2");
				    activatedServices["BufferRequestAndMask"]=true;
				}
			    break;
			}
		}
	    }
	});

	wgs84=new OpenLayers.Projection("EPSG:4326"); // transform from WGS 1984
	mercator=new OpenLayers.Projection("EPSG:900913"); // to Spherical Mer
	
	var mybounds = new OpenLayers.Bounds(-109.060636, 36.992427,
					     -102.042531, 41.004493);
	mybounds=mybounds.transform(wgs84,mercator);
	map = new OpenLayers.Map('map', {
	    projection: new OpenLayers.Projection("EPSG:900913"),
	    units: "m",
	    maxExtent: mybounds,
	    controls: [
		new OpenLayers.Control.Navigation()
	    ]
	});
	
        layerLS=new ol.layer.Tile({
            opacity: 0.7,
            source: new ol.source.OSM()
        });

	
	layer = new OpenLayers.Layer.WMS("ways",
					 main_url,
					 {layers: typename, transparent:'true', format: 'image/png'},
					 {isBaseLayer: false, sphericalMercator: true, visibility: true, opacity: 0.6}
					);
	layer.setVisibility(true);
	
	var myStyleMap=new OpenLayers.StyleMap({
	    "default": new OpenLayers.Style({
		strokeColor: "#5555ee",
		pointRadius: 4,
		strokeWidth: 4
	    })
	});
	
	var myStyleMap1=new OpenLayers.StyleMap({
	    "default": new OpenLayers.Style({
		strokeColor: "#000000",
		pointRadius: 4,
		strokeWidth: 1
	    }, {
		rules: [
		    
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "name",
			    value: "Cafe:%"
			}),
			symbolizer: {
			    fillColor: "#ffaaaa",
			    pointRadius: 4,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "name",
			    value: "Restaurant:*"
			}),
			symbolizer: {
			    fillColor: "#aaffaa",
			    pointRadius: 4,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "name",
			    value: "Cafe:*"
			}),
			symbolizer: {
			    fillColor: "#444444",
			    fillOpacity: 1,
			    strokeOpacity: 0.4,
			    pointRadius: 4,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "name",
			    value: "Hotel:*"
			}),
			symbolizer: {
			    fillColor: "#aaaaff",
			    fillOpacity: 1,
			    strokeOpacity: 0.4,
			    pointRadius: 4,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "name",
			    value: "Recycling"
			}),
			symbolizer: {
			    fillColor: "#66ff66",
			    pointRadius: 4,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
			    type: OpenLayers.Filter.Comparison.LIKE,
			    property: "fid",
			    value: "29547"
			}),
			symbolizer: {
			    fillColor: "#ffffff",
			    pointRadius: 6,
			    strokeWidth: 1
			}
		    }),
		    new OpenLayers.Rule({
			elseFilter: true,
			symbolizer: {
			    fillColor: "#aaaaff",
			    opacity: 0.7,
			    pointRadius: 4,
			    fillOpacity: 0.4,
			    strokeWidth: 1
			}
		    })
		]
	    })
	});
	
	select1 = new OpenLayers.Layer.Vector("Selection", {styleMap:
							    myStyleMap
							   });
	select = new OpenLayers.Layer.Vector("Selection", {styleMap:
							   myStyleMap
							  });
	hover_ = new OpenLayers.Layer.Vector("Hover_", {styleMap:
							new OpenLayers.Style({
							    fillColor:"grey",
							    fillOpacity:0.4,
							    strokeColor:"grey",
							    strokeOpacity:0.6,
							    strokeWidth:4
							})
						       });
	hover = new OpenLayers.Layer.Vector("Hover", {styleMap:myStyleMap1
						      /*new OpenLayers.Style({
							fillColor:"pink",
							fillOpacity:0.6,
							strokeColor:"red",
							strokeOpacity:1,
							strokeWidth:2,
							pointRadius: 3.5
							})*/
						     });
	multi = new OpenLayers.Layer.Vector("Multi", {styleMap:
						      new OpenLayers.Style({
							  fillColor:"yellow",
							  fillOpacity:0.6,
							  strokeColor:"red",
							  strokeOpacity:1,
							  strokeWidth:4
						      })
						     });
	map.addLayers([ layerLS, layer, select, hover_, hover, multi]);
	
	var protocol = OpenLayers.Protocol.WFS.fromWMSLayer(layer, {
            featurePrefix: 'ms',
	    geometryName: 'msGeometry',
	    featureType: typename,
	    srsName: "EPSG:900913",
	    version: "1.0.0"
	});
	
	control = new OpenLayers.Control.GetFeature({
            protocol: protocol,
	    box: false,
	    hover: false,
	    multipleKey: "shiftKey",
	    toggleKey: "ctrlKey"
	});
	
	
	control.events.register("featureselected", this, function(e) {
	    e.feature.geometry=e.feature.geometry.transform(wgs84,mercator);
	    select.addFeatures([e.feature]);
	    elist=$(".single-process:not(.ui-state-disabled)");
	    for(var i=0;i<elist.length;i++)
		elist[i].style.display='block';
	    if(hover.features.length>=1){
		slist=$(".multi-process:not(.ui-state-disabled)");
		for(var i=0;i<slist.length;i++)
		    slist[i].style.display='block';
	    }
	});
	control.events.register("featureunselected", this, function(e) {
	    select.removeFeatures([e.feature]);
	});
	control.events.register("hoverfeature", this, function(e) {
	    hover.addFeatures([e.feature]);
	});
	control.events.register("outfeature", this, function(e) {
	    hover.removeFeatures([e.feature]);
	});
	map.addControl(control);
	control.activate();
	
	control1=new OpenLayers.Control.SelectFeature(hover,{hover: true, clickFeature:createPopup, onUnselect:unSelect});
	map.addControl(control1);
	control1.activate();
	
	var tmp=new OpenLayers.LonLat(7.14,50.73); 
	tmp=tmp.transform(
	    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
	    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
	);
	map.setCenter(tmp,16);
	
	
	//alert(map.getExtent().transform(mercator,wgs84));
	mapControls=map.controls;
	
    }
    
    //
    var getCapabilities = function (params) {
	
        //var target = $(params.target);
        
        zoo.getCapabilities({
            type: params.method,
            success: function(data) {
                
                // Define some usefull functions for templating.
                data.setUpIndex = function() {
                    return ++window['INDEX']||(window['INDEX']=0);
                };
                data.getIndex = function() {
                    return window['INDEX'];
                };
                data.resetIndex = function() {
                    window['INDEX']=null;
                    return;
                };
		console.log(data);
                // Render.
                var accordion = tpl_getCapabilities(data);
                //target.append(accordion);
                showModal("test", accordion)

                // Details button
                $('.showdetails').on('click', function(e) {
                    e.preventDefault();
                    console.log(this.dataset);

                    var $this = $(this);
                    var $collapse = $this.closest('.panel-body').find('.collapse');

                    zoo.describeProcess({
                        identifier: this.dataset.identifier,
                        success: function(data) {
                            var details =  tpl_describeProcess(data);

                            $collapse.hide();
                            $collapse.text('');
                            $collapse.append(details);
                            $collapse.show();
                        },
                        error: function(data) {
                            $collapse.hide();
                            $collapse.text('');
                            $collapse.append("ERROR");
                            $collapse.show();
                        }
                    });
                });
            },
            error: function(data) {
                notify('GetCapabilities failed', 'danger');
                //target.append('ERROR');
            }
        });
    };
    
    //
    var describeProcess = function(params) {
        //var target = $(params.target);

        zoo.describeProcess({
            identifier: params.identifier,
            type: params.method,
            success: function(data) {
                var details =  tpl_describeProcess(data);
                //target.text('');
                //target.append(details);
                
                var title = 'DescribeProcess '+params.identifier;
                showModal(title, details);
                
            },
            error: function(data) {
                notify('DescribeProcess failed', 'danger');
            }
        });
    };
    
    //
    var executeSynchrone = function(params) {
        var target = $(params.target);
        
        notify('Calling Execute synchrone ...', 'info');
        
        zoo.execute({
          identifier: params.identifier,
          dataInputs: params.inputs ? JSON.parse(params.inputs) : null,
          dataOutputs: params.outputs ? JSON.parse(params.outputs) : null,
          type: params.method,
          storeExecuteResponse: false,
          success: function(data) {
            notify('Execute succeded', 'success');
            var details =  tpl_executeResponse(data);
            target.text('');
            target.append(details);
            
            var output = data.ExecuteResponse.ProcessOutputs.Output;
            console.log('======== OUTPUT ========');
            console.log(output);
            if (output.hasOwnProperty('Data')) {
                console.log("FOUND DATA");
                if (output.Data.hasOwnProperty('ComplexData')) {
                    console.log("FOUND COMPLEX DATA");
                    if (output.Data.ComplexData.hasOwnProperty('__cdata')) {
                        console.log('FOUND CDATA');
                        showModal('Execute '+params.identifier, output.Data.ComplexData.__cdata);
                    }
                    else {
                        console.log('SHOWING COMPLEX DATA');
                        console.log(output.Data.ComplexData);
                        var _x2js = new X2JS({
                            arrayAccessFormPaths: [
                            'ProcessDescriptions.ProcessDescription.DataInputs.Input',
                            'ProcessDescriptions.ProcessDescription.DataInputs.Input.ComplexData.Supported.Format',
                            'ProcessDescriptions.ProcessDescription.ProcessOutputs.Output',
                            'ProcessDescriptions.ProcessDescription.ProcessOutputs.Output.ComplexOutput.Supported.Format',
                            'Capabilities.ServiceIdentification.Keywords'
                            ],   
                        });
                        showModal('Execute '+params.identifier, _x2js.json2xml_str(output.Data.ComplexData));
                    }
                }
            } else if (output.hasOwnProperty('Reference')) {
                console.log("FOUND REFERENCE");
                showModal('Execute '+params.identifier, output.Reference._href);
            }
          },
          error: function(data) {
            notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
          }
        });
        
    };
    
    //
    var executeAsynchrone = function(params) {
        var target = $(params.target);
        
        notify('Calling Execute asynchrone ...', 'info');
        
        zoo.execute({
          identifier: params.identifier,
          dataInputs: params.inputs ? JSON.parse(params.inputs) : null,
          dataOutputs: params.outputs ? JSON.parse(params.outputs) : null,
          type: params.method,
          storeExecuteResponse: true,
          status: true,
          
          success: function(data) {
            console.log("**** SUCCESS ****");
            notify('Execute succeded', 'success');
            var details =  tpl_executeResponse_async(data);
            target.text('');
            target.append(details);          
          },
          error: function(data) {
            notify('Execute failed', 'danger');
          }
        });
        
    }
    
    //
    var longProcessDemo = function(params) {
        
        var progress = $(params.target);
        progress.removeClass("progress-bar-success").addClass("progress-bar-info");

        zoo.execute({
          identifier: params.identifier,
          type: params.method,
          dataInputs: params.inputs ? JSON.parse(params.inputs) : null,
          dataOutputs: params.outputs ? JSON.parse(params.outputs) : null,
          storeExecuteResponse: true,
          status: true,
          success: function(data, launched) {
            console.log("**** SUCCESS ****");
            console.log(launched);
            notify("Execute asynchrone launched: "+launched.sid, 'info');

            // Polling status
            zoo.watch(launched.sid, {
                onPercentCompleted: function(data) {
                    console.log("**** PercentCompleted ****");
                    console.log(data);

                    progress.css('width', (data.percentCompleted)+'%');
                    progress.text(data.text+' : '+(data.percentCompleted)+'%');
                    
                },
                onProcessSucceeded: function(data) {
                    //console.log("**** ProcessSucceeded ****");
                    //console.log(data);
                    
                    progress.css('width', (100)+'%');
                    progress.text(data.text+' : '+(100)+'%');
                    progress.removeClass("progress-bar-info").addClass("progress-bar-success");
                    
                    // TODO: multiple output
                    if (data.result.ExecuteResponse.ProcessOutputs) {
                        var output = data.result.ExecuteResponse.ProcessOutputs.Output;
                        var id = output.Identifier.__text;
                        var text = output.Data.LiteralData.__text;
                        console.log(id+': '+text);
                        notify("Execute asynchrone "+id+': '+text, 'success');
                    }
                },
                onError: function(data) {
                    console.log("**** onError ****");
                    console.log(data);
                    notify("Execute asynchrone failed", 'danger');
                },        
            });
          },
          error: function(data) {
            console.log("**** ERROR ****");
            console.log(data);
            notify("Execute asynchrone failed", 'danger');
            
          },

        });
    };

    // Return public methods
    return {
        initialize: initialize,
        singleProcessing: singleProcessing,
        multiProcessing: multiProcessing,
        restartDisplay: restartDisplay,
        describeProcess: describeProcess,
        getCapabilities: getCapabilities,
        executeSynchrone: executeSynchrone,
        executeAsynchrone: executeAsynchrone,
        longProcessDemo: longProcessDemo
    };


});

