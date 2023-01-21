import fs from 'fs';
import path from 'path';
import { PUBLIC_DIR } from '../config';
let raw = [
  [
    "LGA",
    "District / Area",
    "Postal code",
    "Villages\n"
  ],
  [
    "Agaie",
    "Kintako",
    "911105",
    "Abunndace; Akwanu; Aliko; Baro; Bawalagi; Bini-Edrira; Ebangi; Edoman-Woro; Edomem Gbako; Egunkpa; Essui Mutum; Eyatsu; Fogbe; Gari-Nwake; Gbani; Gbawugi; Gbimigi; Gunge; Guregi; Gushe; Gutsungi; Illubo; Jiya Dzama; Kapagi; Kibban; Koroba; Kpasa; Kujikp; Kusogba; Kusoti; Kusoyaba; Laban; Lado; Lakan I; Lakan II; Magaji; Makum-Babba; Mamman-Dogo; Mamman-Ndale; Mashine-Cikan; Maurogi Getsa; Mayaki-Yisa; Munigo; Ndace Kolo; Ndako; Nnegenu; Saganuwa; Sankangi I; Sankungi II; Shehshi; Shipogi; Sonjami; T/Gwari; Tagagi; Tsaduko; Tsagbenku; Tsnaye; Tswayan Doka; Tudunwada; Wace Gbenku; Wadata; Wanigi; Zago; Zeko\n"
  ],
  [
    "Agaie",
    "Kintifi",
    "911104",
    "Afuwagi; Agaie; Ahashe; Alikenci; Angunu; Ashinu; Assayin; Baba-Kasuwa; Bantigi; Batako II; Batako III; Boku; Bororo; Bororoko; Bototi; Bugana; Chata; Chekp-Kinpa; Chekpadan; Chemiyan; Chirik-Olo; Danbole; Daniya; Daracita; Dawaworo; Dekodza; Doko-Baba; Dokoci; Duguyi-Woro; Dzukodan; Dzungi-Kudiri; Ebami; Ebugi; Edo-Kenchi; Edoko; Efi-Gana; Efu-Ladan; Efu-Naskuta; Efu-Ndagi; Efu-Yagi; Efu-yalwa; Egbangi; Eginna; Ejiko; Ejin; Ejingi; Ekagi; Eko Liman; Eko-Egiganyan; Ekogo-; Ekohadegi; Ekosa Nakorji; Ekossa; Ekowugi; Ekowugi-Taci; Ekowugi-Tako; Ekowuha; Ekowuna Nufu; Ekpangi; Emi-Jipoci; Emi-Linan; Emi-Sheshi; Emi-Yanni; Emidigi; Emijiko; Emitacigi; Emiworogi; Esafarigi; Esanka; Esozhi; Estako I; Etsu-Audu; Etsu-Nugba; Etsugale; Etsun-Ndako; Evuntagi; Evutagi; Evutagi-Cikan; Ewangi-Sheshi; Ewugi Dagaci; Ewugi-Gabi; Ewugi-Kofa; Eyangi-Sale; Eye; Ezhi-Woro; Fullako; Fuyaka; Gambo; Gba Cita-Ganyi; Gbadaroko; Gbaji; Gbanatako; Gbogun; Goba; Goyi-Gonta; Goyiko; Gudungu; Guluci; Itsaduko; Jikpangi; Jipo I; Jipo II; Jitu-Magaji; Kakati; Kalema; Kandigi; Kanpi; Kansnagi; Katchafu; Kenci-Keza; Kodogi; Kolo Tidun; Koloshemi; Koriyagi; Kpatafi; Kpatsunlo; Kpotun; Kucitagi; Kungaru; Kunguru; Kutiriko; Lafiyagi; Lafiyagi-Wace; Lakan; Lamduworo; Liman; Lociko; Loguma; Maba; Magaji-Woro; Magajiko; Magba; Maikudi; Maikudi-Nupe; Maikurdi-; Majaki; Makagi I; Makagi II; Malowo; Mamman-Kobo; Mamman-Zagi; Mammantsu; Manfara; Marnati; Masaka-; Masakawagi; Mashina; Mawogi; Mawogi-Tswayan; Mayaki; Maza; Mdugu; Naawoyegi; Nami; Nanfara; Nankokan; Ndabade; Ndagoshi-Woro; Ndaiji; Ndaiji-Ndasure; Ndaiji-Tswayan; Ndalelu; Ndamaza; Ndannade; Nnafene; Nugban; Rani; S/Gari-Hausawa; Sakiwa; Sall-Gbakoroko; Sallaaaru-Tako; Sallawu; Santali; Sarkin-Samari; Shabawoshi; Shabayisa; Shaisa; Sheshi; Sonfara-Abu; Sowanke; Taragi; Tawagayeci; Timigi; Tsa Bororo; Tsadu; Tsadza-Ewen; Tsadza-Nupe; Tsaka; Tsakpati; Tswaciko; Tswasha; Tsweci; Turkur; Umaru; Wadata; Wawegi; Wubago; Wugbe; Wuna; Wuna-; Wuna-Dagaci; Wuna-Kan; Wuna-Lafiagi; Wuna-Woro; Wuna-Zhinde; Yagbaci I; Yellwa; Yelwa-Woro; Zayiko; Zhima\n"
  ],
  [
    "Agwara",
    "Shagunu",
    "923107",
    "Abebugur; Agwara; Akisanri; Alhaji-Da Are; Berkete; Boro Gandugi; Budo; Budo Kadinta; Budo Saidu; Budo Sule; Bukari; Dabon Sansani; Dada Bio; Dauda Bagidi; Debuguru; Den-Kwaita; Dodo; Duga; Fulani; Gabi-Bi; Gada-Gobe; Gade-Aguda; Ganda Bedo; Gandugi; Gani Sani; Garu-Anara; Gera Abubakar; Guffanti; Gungawa; Kando; Kanigungawa; Kuri Bio; Luma; Luma Sanke; Magajin Teku; Mail Wiridi; Mego; Musa Fulani; Naroru; New Sansani; Ofiki; Olan; Old Sansani; Pasatulu; Road; Ruga Boroko; Rugan Nari; Rugan oga; Rugan Raina; Rugan-Munkpa; Sabi; Sahgna; Shagunu; Shinanade; Shubayo; Silinaru; Swashi Madiga; Swashi Mair; Tebetebere; Toafon Sansani; Tumbuya; Tunga Ajia; Tungan Mamba; Tungan-Kara; Tungar Noma; Ujiju; Ulakanini; Unguar Samai; Unguwar; Ungwar; Wakamini; Wausawa; Wee; Wora; Yumu\n"
  ],
  [
    "Bida",
    "Bida",
    "912101",
    "Wanigi; A/Adisa; Agibogga; Aketanbako; Baba Ko; Babeko; Bakin-Zenebide; Bamisu-Wuya; Bangie; Banniu Gbogi; Bantuwa Area; Bazumagi; Bello; Bida; Bida-Fawa; Bidafwa; Bwana; Dangana; Daruda; Dauda; Dzukogi; Dzwayagi; E/A/ Tswanku; E/Abeshin; E/Abonichi; E/Abubakar; E/Afa-Sarkin-Daji; E/Al. J. Wandoi; E/Alh -Tanko; E/Alh-Allah-Yakiyaya; E/Alh-Banmisu; E/Alh-Tahiru; E/Alh. Banmibu; E/Alh. Cijici; E/Alh. Ndagiferuk; E/Alkali-Bwafe; E/Baba-Banga; E/Baba-Jeba; E/Babakor-Dzung; E/Badawu; E/Bafugi; E/Bamisu-Nma; E/Bangaye; E/Banin Bida; E/Banwunangi; E/Banyagi; E/Basheru; E/Bayage; E/Bazumagi; E/BCCC; E/Bentigi; E/Benue Tank-Loncita; E/Benue-Jukegi; E/Besakun; E/Bonwuya; E/Bube; E/Chekpa; E/Coce; E/Dadaima-Mgni; E/Danbugi; E/Dandanma; E/Danyiya; E/Daracita; E/Dokodza; E/Dukya Annebi; E/Duma; E/Dzwale; E/Easghara; E/Edita; E/Edogifu; E/Eengbara; E/Efogi Munzhi; E/Efogi-Leman; E/Efogimenshi; E/Ejiko; E/Ejiko II; E/Ejiko-Rijiya; E/Emiworo; E/Esheta; E/Essozhi; E/Etsu Gbeni; E/Etsu Umaru; E/Etsu-yiza; E/Fengcci; E/Fogun; E/Gabi; E/Galadima; E/Galaima; E/Galedime-Gari; E/Gara; E/Gazacizhi; E/Gbaboruwate; E/Gbafe Bida; E/Gbagbaruku; E/Gbazhi; E/Gbezhi; E/Geniya; E/Ginya; E/Gozanzhi; E/Guduko; E/Gudun; E/Gyaye; E/Hassen Taga; E/Kabeligulu; E/Kania; E/Kanuwan; E/Karako; E/Kari; E/Katanbeko; E/Kibokun; E/Kobonki; E/Kodondo; E/Kolo-Taki; E/Koroko; E/Kotan Komu; E/Kotonkoman; E/Kotonkonem; E/Kpokpo Tswazhi; E/Kuccfagi; E/Kutufani; E/Kyari; E/Labezhici; E/Lakpene; E/Lalenu; E/Lcman; E/Ledan; E/Liman Shafii; E/Liman-Jipan; E/Limen -Gogun; E/Lukepan; E/Lukpan; E/Lumgoyi; E/Madajin-Yagi; E/Madaki; E/Madami; E/Madodo; E/Mai Truku; E/Majin-Kenp; E/Makans; E/Makanta; E/Makuda; E/Mallam-Abba; E/Mambelo Dzugu; E/Man Danganedi; E/Man Makuwa; E/Man Nakisu; E/Man-Jiya; E/Man-Santali; E/Manfafa; E/Manjiya Area; E/Manmosu; E/Manmusa Kidogi; E/Manndaguniji; E/Manzuruku; E/Marinatu; E/Marnati; E/Mashera; E/Mataki; E/Mayak ndejiya; E/Mayaki; E/Mdace Wleya; E/Megayaki; E/Mekame; E/Modki-Bale; E/Mukedami; E/Nagu; E/Naibi; E/Naibi Area; E/Naiji; E/Nakode; E/Nasarafu; E/Natsu; E/Nda Kpaye; E/Nda Tsade; E/Nda-Gimba; E/Ndaji; E/Ndakobokolo; E/Ndaleti; E/Ndamaimi; E/Ndameraki; E/Ndaminaain; E/Ndatafya; E/Ndazwafu; E/Ndeburu; E/Ndeji Kafabi; E/Ndigi; E/Ndoguye; E/Nducekpa; E/Nnedyakpe; E/Nudandyepe; E/Ogi Limen-Shaba; E/Rafi; E/Rani Bida; E/Rofya; E/S/Gone; E/S/Kudu; E/Sagi; E/sakiwa; E/San Sani; E/Sani-Lamu; E/Sanjiya; E/Sanjon; E/Sanluec; E/Santali Benwuya; E/Sapanuwa Kuts; E/Sarken-Kyauro; E/Shamako; E/Sheba; E/Shehu; E/Shengbo; E/Shesa Nupe; E/Sheshi-penti; E/Sheshi-Shaba; E/Shimini; E/Sonfadako; E/Sonfawa; E/Sonfede; E/Sunatsuzhi; E/Tafaski; E/Taka; E/Tako; E/Tako Alh.; E/Tako-Jwabishi; E/Tangbo; E/Tifi-Nnasanci; E/Tsaduya; E/Tsu Kenehi; E/Tsu Musa; E/Tsu Usnen; E/Tsu-Abenchi; E/Tsu-Kenchi; E/Tsuratemukun; E/Tswajiyatsu; E/Tswanku; E/Tswashko; E/Tswatako; E/Tswato; E/Tswato Area; E/Tswatswana; E/Tswaya - shaba; E/Twia; E/Ubandawaki; E/Ubandone; E/Usmantsozhi; E/Wacai Tswa; E/Wacai-Iswa II; E/Wachin-Tafa; E/Wacin Lapa; E/Wambai; E/Wazhiri; E/Ya Ekumisu; E/Yekoko; E/Yekunisu; E/Yikunu; E/Yisanaku; Efu Laruta; Efu Alkeli Musa; Efu Mdatureki; Efu Tsu Nitsa; Efu Tsu-Dazen; Egbeshi; Ekusodu Area; Elsarin Daji; Emi Kuta-Kin; Esso Area; Fogun Area; Gbagbifu Area; Gbagi Ladan; Gbajigi; Gbongbon Tigi; Gundum-Ndasa; Ibrahim; Iswazhi; Iyararuwa-Area; Karan Kuba; Kasuwa-Danuda; Kasuzhi; Kerau Kuba; Kereu Keba; Kereu Kuba; Kpanta; Kpotu; Kucitafi Area; Lomcita; Lomcita Area; Lomen Shabe II; Lubasafugi; Mali; Masaga; Masaruli; Nasalach Bologi; Nayazu; R/Aaba Kpekoo; S/Gida; Serki; Shaba; Shabe; Tadafu; Tafa; Tako Wasa; Tswatagi Area; W/Wacaintswa; Yadafu; Yakiyaya; Zdazaba\n"
  ],
  [
    "Borgu",
    "Babana",
    "913106",
    "Abdullahi Kparu; Abdullahi Woru; Abu Kparu; Agbeloban; Agbelobu Kparu; Agen Budo; Akwaru Saka-; Alfa Bani Bodo; Alh. Hussaini; Alh. Ibrahim; Alh. Msciden; Aliri Kparu; Aliyu-Budeboin; Arikpru; Ayooru; Baba Karin; Babana; Bani Awayer; Bano budo; Bariya Woru; Beni Ture; Bio Ago Orokin; Bio Gbern; Bip Gizah; Biyan; Bobioro; Bodo; Bodu; Boni Yori Bodu; Brobuye; Budo; Budo Saidu Sabi; Budo Wara; Budu Aiki; Bukarnikparu; Buogan Kparu; Dabon Kparu; Dawiru; Dekale; Dekale Gbeji; Digoro-Kparu; Fidena Kparu; Galadimaru; Gamoru; Gauji; Gauyi; Gawkosu Budo; Gbabanbudo; Gbade; Gbeteru; Gbo; Gbogbonu; Geri Wari; Gigoro Kparu; Gogen Kparu; Goro Bani; Goromgun; Gudmi Kparu; Gukenbi; Gumbadoro; Guruko Baku; Gururu; Gusakp Aru; Ibrahim Kparu; Ibrahim Woru; Ilorin; Jurgunwan; Kabe; Kabotu-Budo; Kabun Bude; Kai; Kanu; Kapubara; Kara; Karenzi; Karinu; Katafo; Kenerun Kparu; Kigbe; Kiyoru; Koburen Kparu; Kokani; Komoduren; Konkwesso; Koro Achin; Kpakotoru; Kparu; Kpenwonki; Kpura; Kpura Mondoro; Kpyen Kpatu; Ksokonbara; Kubil; Kuri; Kwaya; Kyeru; Lumoto; Machu; Mai-Areoan; Mammen Kparu; Mancido Kparu; Manden Budo; Marani; Mare; Maroji; Memko; Monkon; Mubure; Mure Budo; Nameru; Ochan Kparu; Ogun Budo; Ogun Madugun; Oluji; Pa; Pege; Puissa Bani; Saba yunusa; Sabi Sidin Budo; Safelumo; Sakan Lajia; Sanboora Kparu; Sani Kparu; Sani Yeron; Sann Bani Ayoo ru; Sarkini Fulani; Sekini Budo; Seoya Shafasiri; Sheron Bune; Shinken; Ssanomoru; Subi-Sike; Suno Sabi; Sure; Swapa; Swate; T. Bube; Taben Budo Takun Budo; Tu Ganvuda; Tunger-Jaraa; Tungun; Tutu Sumonu; Uma Ru Sudu; W oru Gobin; Wa-Kekubu; Waba; Woru; Woru Doro; Woru Gura; Woru Yeriman; Woru Yoyo; Wuri Woru; Wuro; Wuru; Yahayan Budo; Yaken Budo; Yakinbun; Yanban Kparu; Yangbasum; Yangbasun; Yanpokorun; Yaro; Yendana sabi; Yere; Zugariji\n"
  ],
  [
    "Borgu",
    "Wawa",
    "912105",
    "Abdullahi; Abun Kparu; Ada Shakarun; Adamu; Agbeshidi; Agumu; Aheandum; Alafiyaro; Alen Kuyeba; Alhaji Kparu; Alufeturen; Alun Kparu; Andemi Kparu; Anita Boyuja; Ankomu Kparu; Aranguru; Argungu New Settlement; Aso Inan Kparu; Ason Kparu; Asuman Kparu; Awaye; Ayiatila; Ba Ah; Baba; Babasola; Babsumkparu; Bakuta; Bamkubu; Basten Kparu; Beben Baru; Benorabu; Bero Keru Kpani; Beruko Kparu; Biborun; Biokpor Kparu; Bioponto Weran; Boni Zunbu; Bonni Iben; Bonni Sikan; Bugan Kparu; Bussa; Dahseki; Danbokparu; Dekera; Dogen Kpanu; Dogon Gari; Dore; Dorian; Forfon; Fulani; Ga A Yakparu; Gaa Gasows; Gaa Mango; Gaa Tawun; Gada Oli; Gado Yakparu; Gadun Sarkin; Gandege Kparu; Gandu; Gandu Gbere; Gandu Take; Gangalesaho; Gangle; Garafin; Gari; Gbebara; Gbehjin; Gen Din Kparu; Gengadu; Genikasayi; Getidon Kparu; Getula Safadi; Gidagbanso; Gidan Bamekidi; Gidan Goshijiza Gidan Marafa; Gidan Nabuku; Giddan Doma; Godebe; Gogan Samun; Goide; Gonagbaso; Gonwa; Goyan Kparu; Gunanguru; Gunji; Ibrahim Kparu; Imile; Indun Bube; Isa; Issa B. Ason; Jabekwari; Jantawun Kparu; Jobbon Kparu; Kaba; Kabu Keya; Kagbenja; Kai; Kakuria; Kali; Kandami; Kanji Dan; Kankuria; Kanu; Kaojera Fulani; Kapubare; Karabombe; Kaunkpe; Kekepe; Kemi; Kemken Kparu; Kere; Kerenji; Keronji; Ketiden Kparu; Kigbera; Kobo; Kodabo; Kogogi; Kokani; Konkoso; Kori; Koro; Kpame; Kpanu; Kpara; Kparu; Kpasan-Ralee; Kpenya; Kpepiya; Kporu; Kuble; Kwa Sare; Kwakhuna; Kwaran kparu; Kwatan Wara; Leshigbe; Lesu; Libraray; Litensure; Maduns-Menga; Mahuta; Malale; Mamengte; Mandasuki; Marani; Maresumun; Masana; Mibbe; Mohammed; Mongola Fulani; Mongoro; N/Settlement; New Bussa; New Kuruwasa; Nunworugu; Old Rurwara; Oskete; Patai; Qua; Rakuni; Rebagore; Rugan S. Fulani; Saboh Gari; Sabon; Sabon Pogi; Sadoro; Safeluna; Sakon Bara; Sanni Kparu; Saon Gari; Sarabe; Sarkwama; Sat Gayi-new B; Segun; Sesura; Shafari; Shakaru Kparu; Shamage; Shani; Shiyaman Kparu; Shiyen; Sobi yarun; Sofon Degan; Sukenkaru; Sutaran Kparu; T. Alh. Dan; T. Angulu; T/Abashi; T/Adanu; T/Ajikomi; T/Ali; T/Ankiki; T/Auta; T/Awaru; T/Awato; T/Azangonno; T/Azunfa; T/Baare; T/Babun; T/Babushi; T/Bagudu; T/bako; T/Bana; T/Bani; T/Bani mari; T/Barimini; T/Basuna; T/Bawa; T/Bela; T/Bezuna; T/Bobadomu; T/Bogo; T/Bogonnkure; T/Bube; T/Buhago; T/Buje; T/Chinlamai; T/Chuguru-; T/Damana; T/Damisa; T/Daw; T/Dogari; T/Dokule; T/Doran Roma; T/Dore; T/Ecko; T/Eoka; T/Gada; T/Galadima; T/Garba Adda; T/Garbasashi; T/Goro Kunbo; T/Gwani; T/Hassan; T/Ibrahim-; T/Jaddikaka; T/Jaru; T/Jatau; T/Jatua; T/Jetaru; T/Kanta; T/Kikwashi; T/Kogbale; T/Konde; T/Kudu; T/Kuginya; T/Kulikuli; T/Kyanre; T/Lafuja; T/Lakalle; T/Lakunle; T/Lofiye; T/Magaji; T/Magaji-Generu; T/Magala; T/Magiro; T/Makili; T/Makunderi; T/Makunle; T/Mamata; T/Mamman; T/Masara; T/Moma; T/Monohi; T/Musami; T/Mzigibi; T/Nayasha; T/Noma-Majego; T/Odegu; T/Okofun; T/Omeru; T/Pakie; T/Sabi Dogo; T/Sadakaya; T/Sadangi; T/Sagaru; T/Saji; T/Sallai; T/Sami; T/Samu; T/Sembe; T/Semmo; T/Shaba-Umaru; T/Shagamu; T/Tudu; T/Tuma Jidda; T/umaru; T/Woru Issu; T/Yaru Kuma; T/Zakawu; Taada; Tagan Sarkawa; Tamanai; Tasare; Temidire; Ten; Ten-Bonu; Tengan; Tikendu; Tonguwen; Tudan Sani; Tukanzoro; Tungan; Tungan Gado; Tungan Gungun; Tungan Kjwani; Tungan Kuka; Tungan Kure; Tungan Lami; Tungan Mai; Tungan Maile; Tungan Nagoda; Tungan Sani; Tungan Sule; Tungan Tasmiya; Tungan usaman; Tungan Yahaya; Tungan Yahjuza; Tungan Yakubu; Tungan Zabairu; UmaruMauberun; Unguwan Fulani; Ungwan Waje; Usman Bi Sani; Usman Kparu; Wanhin-Kparu; Wawa; Woriya Woru; Woru Yen; Yagwso; Yakparu; Yakubur Kparu; Yalle Menosi; Yami; Yanbon; Yanjowu Kparu; Yarun Beru; Yawagin Kparu; Yeshikiri; Yowdomun; Zattena; Zu Gunji; Zugunji\n"
  ],
  [
    "Bosso",
    "Bosso",
    "920102",
    "Bejo; Bosso; Chanchaga; Garatu; Kampala; Kodo; Maikunkele; Maitumbi; Shata\n"
  ],
  [
    "Chanchaga",
    "Minna",
    "920101",
    "Babeji; Bako; Bako Pampe; Debbi; Ekpigi; Etsu Musa; G. Dutse; Gwodworo; Jamgaru; Jigbeji; K. Dajuwa; Kampani; Kangwa; Kuka; Kurumi; Lapai; Lashami; Nagun; Nkankutu; Pette; Popoi; Shana; Zakwogi\n"
  ],
  [
    "Edati",
    "Jima/Doko",
    "913102",
    "Adoga; Anbgbaba; Anfani; B/Ndagbaji; B/Tako; B/Tifin; Baba; Baba Isa; Baja; Barwa; Bokangi; Boki/Yekotacin; Ceko; Cetufu; D/K/Guragi; Dadofu Idoko; Dakani; Dakuntigi; Dangi; Dantigi; Dato; Dazhi/Doko; Dicitagi; Dingi; Doko; Dokofogi; Dokogi; Dokokpan; Dokomba; Dokotigi; Dzwowu/ Kpocita; E/Solawo; Edoci; Egubagi; Ekpagi; Elomi; Emigba; Emijiko; Emikuta; Enitsu Mangun; Eoki/Yabaja; Epsu Zagi; Esumti; Ewako; G/Yekogi; Gaba; Gbaci; Gbara; Gbodoti; Giragi; Gudukoshaba; Guga; Guzzan; Jikanagi; Jima; K/Dakpan; K/K/Giraki Kpacinifu; Kupafu; L/Danyagba; Lacin; Lagun; Loncitagi; Lugwa; Ma Ag' Bukun; Ma Agi Kenchi; Mambwari; Mustafa; Nantu; Nginda; Nuwandurgi A; Nuwandzungi; Nuwandzurgi B; Patigi; Sanchiya; Santali; Seesshishaba; Sunlati; Swansun 2; Swansun I; T/K Bako; T/Salkawa I; T/Salkawa II; Takpa; Tokogi D; Tokunzhi; Tswasha; Vunchi; Wodata; Wusanti; Y/Doko; Yagbagi\n"
  ],
  [
    "Edati",
    "Kutigi/Edati",
    "913101",
    "Enagi\n"
  ],
  [
    "Gbako",
    "Edozhigi",
    "912102",
    "Abu Sonmasu; Abukogi; Abulijali; Adamaru; Akote; Akotie; Alfa Kolo; Aliyu Gonyi; Asba Takun; Audu; Babban; Baga Biri; Bakolo; Bara; Baratsu; Barje; Benuko; Biramafu; Bubakar; Cakopanfu-; Cekpanfu; Cemity An; Chegungi; Chekpan; Da agba; Dabanfu; Dabarako; Dada; Dakpan Babben; Dakpan Majin; Dakpan Wuro; Dancita-Shaba; Dancitako; Dandegi; Dantigi B; Dantigi Dzan; Dantigi Saba; Dapansode; Dari; Dingi; Dogbe; Dukun Sakum; Dunguru; Dupashi-Ladan; Dwalle; E/Amare Eyagi; E/Guzan; E/Jibo; E/Liman; E/Madaki; E/Nadaoko; E/Ndaturaki; E/Sheshi Pati; E/Sollawu; E/Tsadu Rani; E/Worogi; E/Yakako; Ebu Sokun; Edobagi; Edogi Karami; Edosi Babban; Edozhugi; Egbako; Egbati-Chatafu; Egbe Dzama; Egbe Mamm; Egbeko; Egokota; Ehukpangi; Ejiki Kpata B; Ejiko Kpata; Ekpangi; Elagi; Elagi II; Emagiti; Emagiti Gadza; Emagiti-; Emi Afa; Emi Goyi; Emi Isah; Emi Jibo; Emi Kakara; Emi Kolo-Sagi; Emi Lada; Emi Likali; Emi Likoli; Emi Man; Emi Manko; Emi Mayaki; Emi Men; Emi Mustafa; Emi Ndace; Emi Ndaiji; Emi Ndayagi; Emi Qoroyi; Emi Rafi; Emi Sagi; Emi Shaba; Emi Sheshi; Emi Shiru; Emi Souma; Emi Wasako; Emi Woshi; Emi yamma; Emi Yatsu; Emi-Bube; Emi-Dwalle; Emi-gba; Emibusokungi; Emigii; Emijibo; Emijiko; Emitan Legbo; Emitete; Emitsu; Emitsu Alhassan; Emitsu Dangana; Emitsu Mmedu; EmiWorogi; Emiworogi-Babba; Emiworongi; Emo Gba; Emu Tiswayan; Eni Gba; Eni Ladan; Eni M.Adama; Enugi; Epan; Essan; Etsu Audu; Etsu Sidi; Etsu-Diko; Ewu Zuma; Fakinba; Fenbo Degi; Gadza; Gakogi; Gb/Ndaijiko; Gbadafu; Gbangba; Gbaricaogi; Gbate; Gbebon Zhitsu; Gberifu; Gbgimuta; Gegata; Gidegi; Girigichi; Gogata; Gogata Rabo; Gogota; Gorogban; Goyata Cekpa; Gubagi Slkyata; Gusadi-Kenko; Halidu Halidu; Jigada; Kagowogi; Kanko Mamman; Karami; Karamio; Karani; Katakpo; Katamba Bologi; Katayeregi; Kechigi; Kncitagi; Kocikota; Kolo Nnatsu; Kolosa; Koya; Kpafu; Kpatanti; Kpotu Nupe; Ktambako; Kucikota; Kucita Alkali; Kueifa; Kupa Ndagbaci; Kuragba; Kusako; Kusogoyi; Lafiyagi; Lemuta; Liman II Fin; Liman Tako; Lime Durakpe; Lukoro; M. Gbachi; Madege; Magoji; Majin Badi; Majin Karami; Majin Ndaishi; Majin Zhitsu; Majinsen; Makussan; Man Ganagidi; Man Gojere; Manafu; Mandafa; Masalkaci; Mayin Raka; Medede; Mengarasa; Mywofu; Nda aba; Nda Baba; Nda Doko; Nda Mamman; Ndace Suma; Ndadzuru; Ndagbaci; Ndagbira; Ndagiwagi; Ndaiji Gazan; Ndakama; Ndakotsu-Allah; Ndarubu; Ndarunbu; Ndeiji San; Nimadu; Nina Tukuru; Ninwoye; Nmagumu; Ntakogi; Nu Ayan; Nungorota; Pacifu; Paciko; Pati Atitu; Patifagi; Patigi; Patigi-Edozhigi; Patitagi; Potungi; Rabaci; Rogota; S/Gida; Saba; Sagamuwan; Saganuwan; Sakiwa; Sakofu; Sanfada Kpotu; Santali Umanu-Dandgi; Senkpata; Shaba Dangana; Shaba Dangana II; Shabafu; Shabe Nupe; Sheshi; Sheshi Benu; Sheshi Nnako; Sheshi-Rani; Sheshiko; Sheshishi; Shishe Legbo; Shishi Babba; Soje Benu; Somiyan; Sonfadako; Sotowutsu; Swajiya Tsu; Swasu Dzma; Tabo; Tanti Wusa Isa; Teteko; Ts/Majin; Ts/Mayake; Tsachu Nda; Tsadza; Tsndu Rani; Tsowa Duzuru; Tsowa Nda; Tswako; Tswanku Tako; Tswanku Tifi; Tswasha Benu; Tswashako; Tswatafi; Tswatswana; Tswoko; Ttschiko; Tukugi Ndatam; Tunga Benu; Twaki; Twakifu; Umaru; Umaru Baba; Waciko; Wan/Aliyu; Wanbaji; Wanbaji Aloiyu; Wawagi; Wuga Sona; Wuye Sakonba; Yagbafu; Yakubu; Yebotsu; Yeluwa; Yelwa; Yidabo; Yilakocat; Yinfu; Zancita; Zimbo\n"
  ],
  [
    "Gbako",
    "Lemu",
    "912103",
    "Abaguta; Abuchado; Ajake a; Ala-Tswaci; Algeta-Bubakon; Aloyu yagi; Anfaur; Ayiso; Babban-Zaure; Bafaworo; Baki ja abo; Bata; Batagi; Batako; Bicafu; Bine; Bisauti; Buki Manu; Buku Kota; Cemiyan I; Cemyan Tako; Cen/Tifin; Chogo; Cijimisu; Dacaita; Dacaita Sabo; Dacitako; Dakore; Dancita Kolo; Dangi; Dasa ma Salali; Dasa Turia; Dautigi-Borogun; Dikko; Edokota; Edotsu; Egbatisan; Ejiko; Emi Dewo; Emi Iyeti; Emi Ndaji; Emi Ndako; Emi Rowa; Emi Sanmasu; Emi Takogi; Emi Tswaci; Emi Tswanyan; Emi Worong; Emi Yagi; Emi-Daci; Emiaru Sabo; Emibezhi; Emigiyatsu; Emigozan; Emikupa; Emitsu Bubakan; Emitsu Isado; Emitsu Yagi; Emiyezhi; Emo Sagi; Eni Maru; Enogogi; Enu Gaka; Essa; Etsu Abu; Etsu Alashe; Etsu Audu; Etsu Yisa; Evatagi; Ewanko; Fujeregi; Gabanginigi-; Gagato; Ganabigi; Gari; Gatagi; Gbagba Tsofo; Gbaginigotako; Gbandun; Gbangba; Gbanguita; Gbegbaruku; Gidanko; Giwa Yagi; Godogo; Gududzuru; Guye; Ja Jadu; Jaba; Jangana; Jatau; Jeban Ciko; Jiyako; Kagowogi; Kalace; Kalobu; Kantogi; Kpapeci; Kpauta Nakoji; Kucitagi; Kudugi Nakorji; Kukakugi; Kukece; Kusogi; Kuyi Babba; Kuyi Karami; Lada; Lagbo Zukum; Lago; Lakin; Laukorogi; Lemi; Lori; Magi; Magujin Geri; Mamagi; Mamasala; Mandzukwa; Mangevala; Manmuna; Mantafen; Manzainu; Masaasa; Masani; Mawoge; Mucita; Mundisabo; Munditsofo; Ndace Yeko; Ndadce Babbo; Ndagbaci; Ndaiji; Ndakogana; Ndakotsu-Gbagba; Ndakotsu-Shuru; Ndalado; Ndamake; Ndamanman; Ndarubu; Ndasheuko; Ndatuki; Ndaturaki; Nmagunu; Nngwogegi; Nuwako-Souman; Nuwakota; Patigi Tabo; Patishun; Patoshin; Picitu; Pundzuru; S/Gari; Sabon Gida; Sagunwo; Sakiwo; Sautigi; Shaba Legbo; Shabafu; Sheeshi Gona; Sheshi Ya Benu; Sheshiko; Somajiko; Sonfacako; Sonmajigi; Sunsun Ndadan; Swagungi-Sebon; Tangwagi-Woro; Titin; Totoko; Tsadko; Tsadu; Tsadu Kafa; Tsadu Kashi; Tsadu-Baraja; Tsadza; Tsadze; Tsakpazhi; Tswako yagi; Tswako-Makun; Tswako-Yabi; Tswanyan; Tswasho; Tswatagi; Wacin Saba; Walin Gana; Wasagi; Washigi; Wodata; Yabatagi; Yazhingi-Tswala; Yikangi; Yizhigi; Yizhigi Tsadu; Ysia Dzuru; Zanagi; Zanfita Daku\n"
  ],
  [
    "Gurara",
    "Gawu",
    "910102",
    "Abuchi; Baji; Boku; Boku-Nubuta; Bonu; Daku; Dikko; Ebba; Dagbami;  Tudun-Wada; Gawu-Gasakpa; Gawu-Kopati; Gawu-Dawaki; Kaura-Gawu, Gawu-Babangida; Guna; Gurara; Gwachife; Gwari; Izom; Kabo; Kadna; Kaka; Kungo; Kungoshi; Ladan; Lambata; Lefu; Buzhi; Mararaba; Nasami; Saku; Shanu; Shegi; Tuchi; Tufa; Tuna;\n"
  ],
  [
    "Katcha",
    "Badeggi",
    "912104",
    "Amina Woue; Amma; Angulu Gitsu; Arewa; Badeggi; Bakin Chachaga; Bakin Chacheja; Bakohdare; Bishetiawoji; Bissati; Bororo; Bossati; Captigi; Cheche; Cikagasa; Cikatigi; Copa; Dadi; Daniya; Dankorogi; Danuya; Daracita; Dari; Dodi; Dokogodu; Edigi; Edikusa; Edotsu; Ekapagi; Ele; Elegi-Zuzungi; Emi Klofogi; Emi Ndaci; Emi Sheshi; Emi Tsowa; Emi-Liman; Emi-Natsu; Emigba; Emigbari; Emijiko; Emirafi; Emitacigi; Eshasti; Eshsti; Essa; Etsu Bako; Etsu Mamma; Etsu Sidi; Evaa Agada; Evatagi; Evutagi; Ezhigi; G/Danladi; G/Saidu; Gade; Gadza; Gana; Gbado; Gbagbnaruku; Gbakogi; Gbakpan; Gidan Dogo; Gidan Mai; Goshigi Babba; Goyi Dzuwa; Goyikenu; Gudan Dogo; Gusadi; Guye; Halilu; Isa Kpant; Jimade; Ka agi; Ka agi Maba; Ka agi Toga; Kafa; Kagowogi; Kakapkagi; Kakun; Kanbari; Kanma; Kataeregi; Kataeregi-Rapakpa; Katako; Kataregi; Kausangi; Kladi Pangu; Kloerogi; Kodoko; Kotugi; Kpanti; Kparaka; Kpata Savi; Kpotu; Kpotuko; Kpotuku; Kuncita; Kusogi; Kutakpa; Kutukpa; Ladan; Lade; Lafiyagi Lafe; Lafiyagi-Zadi; Lafoyagi-Zadi; Langga; Lanko; Lankokpagi; Legbodzan; Lenfa Bororo; Mageda; Magenu; Majidadi; Mamafu; Mamma isa; Mantuntu; Maraya; Masantali; Matulu; May Aki-Kolo; Mayaki; Menefu; Mukagi; Nagya Amadu; Natsu; Nda Gowogi; Ndabarshi; Ndadoko; Ninwoye; Olusegi; Pato Ndaloke; Rabakpa; Rafin Bauna; Rapin; Sabongida; Sagikoro; Sakciwa Natsu; Sakowa; Samasi; Sawaidi; Shidi Agga; Shiri; Sonbagi; Taka; Takutu; Tiawogi; Tsadogonns; Tsadu Gakpa; Tsaduko; Tsdogonna; Tsdudwale; Tsowa-Maka; Tuturugi; Wadata; Wadata Pangu; Wadata Tasha; Wasagi; Zadi; Zancita; Zhumanle\n"
  ],
  [
    "Katcha",
    "Katcha",
    "912105",
    "Agbyadya; Aliyu Goyi; Alkusu; Anbara; Assanyi; Aubira; Baba Dwafu; Bakeko; Bantigi; Bashi; Bashi Mugun; Bawallali; Bologi; Cekpa; Cetuko; Cetukpagi; Dagba Kota; Dama; Dancita; Dancitagabi; Dawa; Dugu Isa; Dwafu Tako; Dwafu Tifi; Dwalle; Dzangbodo; Eba; Eccgi; Edotsu; Ega-Kua; Egb Nagya; Egbati Mayaki; Egbati Tswaki; Ekugi; Emi Cimbo; Emi Dado; Emi Daniya; Emi Kakemi; Emi Kosu; Emi Kugi; Emi Shaba; Emi Sode Gabi; Emi Tacigi; Emi Tsoda; Emi Tswaci; Emi Tswanko; Emi Woronangi; Emiguye; Emitsu; Emiwoarongi; Ewo-zhi; Eye Babba; Eye Karani; Fugaka; Gabi; Gaji Amn; Gana-Dzurugi; Gara; Gara Lakpene; Gbaguda; Gbakogi; Gbangwa; Gbape; Gbogi; Gboyako II; Gidigi; Ginanle; Godza; Gogo; Gubagi; Guzan; Gyagogi; Jacita; Jibbo; Jiya Zagi; Kaji Gboyako I; Kashe; Katcha; Katcha-Areda; Katcha-Kudu; Katcha-Yama; Kolo Gbako; Korogba; Kpand Subi; Kpandaragi-Kinpa; Kpanti; Kudogi; Kunbo; Kupau; Kusoti; Kutigbari; Kuyere; Lafiyagi; Lafujagi-Saba; Lafyagi Kuli; Lekun; Magayaki; Majahidu; Makam Dzana; Manaoyi; Manbe Ndace; Mandana; Masgia Karani; Mashin Baba; Mucita; Naakuso; Ndabisa; Ndadako; Ndadoko; Ndagunu; Ndaji; Nnakuso; Nnatsu; Pati Maza; S/Garo; Sagi Karami; Sakun; Salawu; Shaba Mambe; Sode Tana; Soinmazhi; Songubi; Summa; Tabo Goshi; Tsadoyagi; Tsadu Baba; Tsayan; Tsowa Alhesi; Tsowa Anagulu; Tswaciko; Tswako; Tswasha; Turuku; Wucetagi; Yammmashiru; Yinti; Zafiyagi; Zhit U; Zhitu Karam\n"
  ],
  [
    "Kontagora",
    "Kontagora (rural)",
    "923101",
    "Abubakar; Alala; Am. Benyo; An. Auta; An. Dan Jibo; An. Maidandum; An. Mamman Gwdan; An. Man, G/Abara; An. Muham.; An. Nagani; An. Saidu; Badakkar; Badukke; Bakin Gulbi; Basullube; Bawa Ragura; Buda; D/Dawan Tum; D/Fadama; Daji Kamuku; Dappa; F/Usalle; Fangu Us; Fun Abdu; Ganawa; Ibini; Ibolid/Fadama; Kafin Maikomo; Kag. Gabirawa; Kagara Tsahuwa; Kam Bain; Kamuka; Kamutu; Kontagora; M. Bnuda Sadau; M. Buda Sadau; M/Adamu; M/Bisallah; Maaji Mashingin; Magaida; Magaji; Magandu; Maje; Makeri Boka; Malehe Gari; Malo; Maraba Lamba; Masaha; Masama; Mashigin Maje; Masuga Gari; Matacibu; Mint. Masakara; Monde; Munt. M.; Nama; Noma; Rafin Gora Gari; Rafin/Wa-Gona; Ragadawa; S/G Managu; S/Garin; Sar/Sudan; T/Amadu Kama; T/Gamu-Gaku; T/Jaye; T/Kawata; T/Kawo; T/Mande; T/Na Ukku; T/Sakko; T/Siri; T/Usubu; T/Wada; T/Wawa; Tun Akwati; Tun Babandogo; Tun Bagudu; Tun Habu; Tun. Gelawa; Tun. Habu; Tun. Maikame; Tun. Makeri; Tun. Sullubawa; Tun/Ga-Allah; Tund Ado; Udara; Ung. Amaduri-Zargina; Ung. Balassar/; Ung. Dukkawa; Ung. Galadiman; Ung. Jan. Buda; Ung. Janwuru; Ung. Mamman; Ung. Ranga; Ung. Saturan Noma; Ung. Zuru Gadan; Urungwa Gari; Usale; Usalle; Ushinda; Usualle; Utacu Gari; Uzange; Uzange M.; Uzawe; Yarkade\n"
  ],
  [
    "Lapai",
    "Birnin Maza",
    "911101",
    "Acitukpa; Adagba; Ajiji; Anmadu; Baban Gwari; Badegi-Lapai; Bargo; Basa Sabo; Batatu; Binin-Maza; Bwacha Basa; Bwache; Bwaji; Cecetudun- Lalada; Cheche; Dado Dangana; Dara; Dwafu; Efubankogi; Efujwaja; Efushaba II; Efutsawa; Eminuku; Etsugi; G. Un-Gabas; Gabi; Gananadi; Garawa; Gatako; Gbacidan; Gbanwa; Girkuma; Gudani; Gurdi-Basa; Gwauna; Isadza; Jaligah; Jimada; Juguda-Fulani; Kache; Kapako; Katakiti; Kawu; Kotara; Kpabisan; Kpagu; Kudugu; Kungoshin; Kunguni; Lapai; Lenfa; Magbashin; Magudan; Mai Jaki; Mawogi; Mayali; Mdamurugi; Mukugi; Muwanbubu; Ndawashi; Ndeji; Pangu; Ruga; Ruga (II); Rugan-Mugu; Rulani; Sami Naka-Gwari; Saminaka; Saminaka Hausa; Shaku; Sonfada; Sundugi; T/Alallam; T/baushe; T/Jaiye; T/Makafo; T/Sarkin Fulani; T/Tukura; Takalafiya; Tako Achau; Takuti-Ruga; Tashibo; Titundo; Un Yuguda; Un-Arewa; Un-Jamma; Un-Natena; Un.Limen-Ashin; Zagom-Basa; Znimadegi; Zologi; Zugi-Mazabo\n"
  ],
  [
    "Lapai",
    "Ebbo",
    "911103",
    "Akoyi; Akwanvu-Oaji; Anguwan-Havshwa; Apataku; Baka Tako; Baka-Fifin; Bashi; Bashi-Gwuari; Beba; Cibeyaga; Daku Bwaje; Dakunmi-Gati; Dere; Dwale; Ebbo; Ebwa-Kikoshinna; Ebwadakiri; Ebwekoba Madi; Ebwoa; Eda; Elegi Mumbu; Eshi; Euchi-Yababia; Ezhin Sabo; Gbami; Gbedu-Sabo; Gbege; Geku; Katakpa-Scho; Koki; Kpange; Kuchi-Eye; Kuchi-gbago; Kuchi-Kebba; Kuci; Nyanbabo; Paisa; Puzhi; Rakapa; Rarabuku; Rigivo; Tana; Yawa-Kanaworo; Yawa-Wadata\n"
  ],
  [
    "Lapai",
    "Gulu",
    "911102",
    "Abeta; Abugi-Jankana; Abugi-Kenigi; Abugi-Kenigo; Aciba; Aciba Woro; Aciba-Gudo; Adun-Beku; Adwakia; Agb Beku; Akiba; Akwanu; Amina; Arah; Atsu; Atsu-Amiko; Atsu-Re Kpan; Avukucita; Ayuya; Azopati; Bgeye; Bina; Bina Yaba; Biwa Gbedu; Bokyo; Borokpan; Bwasoje; Ceku; Dabagaje-Woka; Dabogi; Dagbaje; Daji; Dalami; Danbe; Doba; Duma; Duman-Bassa; Eba Emitachi; Ebaloti; Edo; Edo-Etsubagi; Efan; Efutsu-Abu; Egba; Egba-Tuko; Egbagomacibe; Egbati; Egun; Egya; Ekkan; Ekku; Ekun; Emiko-Tako; Emileban; Emiworogi; Emu; Epe; Eshinshinbu; Etsu-Makka; Etsu-Ndakoji; Evti; Ewabademi; Ewan-; Ewtc-Emiko; Ewugi; Ewukponu; Fapo; Faru; Gada-kpan; Galle; Galu; Ganyakpa; Garabda; Gati; Gbaguje; Gbakinku; Gbandara; Gbedako; Gbedu; Gbodumega; Gbolu; Gupa; Gupa-Atsu; Gupa-Mifin; Guragi; Gurdi; Gurgudu; Gwa; Hasheyimi; Jakapami; Jakucita; Jihu; Kagbodoi; Kalaba; Kandi-Emiko; Kandi-Gbimi; Katakiti; Katakpan; Kiripo; Kpada; Kpasama; Kpotegi; Kuba; Kukwo; Kuti; Lafuya-Kpada; Lapaigi; Malaba; Mararbba; Mukugi; Muti; Muye-Gbako; Naibi; Nakwabi; Nasarawa; Nasarwa-Bassa; Nikpe; Nnakpan; Nuugbangi; Nyanda; Nyimi; Pele; Pelemi-Kunkond; Poko; Revu; Rifi; Sabo Muye; Samle; Sanumwagi; Shevu-Sabo; Sokun-Fvba; Sokunsheba; Sokvn-Pege; Sokvntaki; Sulu-Lukati; Tanaye; Vatsa-Adeyan; Vatsa-Agbana; Vatsa-Eminworogu; Vuiegbo; Wue-Wuna; Yabata; Yelwa; Yelwa-Pacha; Yung-Guji; Ywlwa-ana; Zabba; Zaikpe; Zango; Zhitmigi\n"
  ],
  [
    "Lavun",
    "Kutigi/Edati",
    "913101",
    "Ajanabu; Ajanatu; Alakusu-Tsah; Aljusu Ndabu; Aragieta; Audu Kenco; Bade; Bafo; Bakombgagi; Baminda; Bana; Bankawu; Bantogi; Baratsu; Barzzhe; Batagi; Batagi Ndace; Batagi-Dzwabu; Batati; Batavovogi; Batzhitsu; Bawu; Benuko; Bokungi; Bongi; Boromo; Bukkasa; Bwada; Cegiama; Changudugi; Charati; Charati (To); Chatafu; Chegungi; Ckkagi; D/Masalaci; D/Ndatuna; Dabangi; Dabban; Dadi; Dafi Buku; Dagbegi; Dagida; Dakpanci; Danara; Dancitagi; Dancitako; Dangifu; Danko Emi; Danti; Darafa; Dari; Dassun; Datako; Dati-Mapa; Datso; Dayifu; Dikko; Dikko Tako; Dikko-Tikin; Diko Koro; Dodondawa; Dofu Bake; Dogbe; Dokke; Donko; Dooci; Dowogi; Duma; Dumagi; Dzagwun; Dzunmbe; E/Bafu; E/Dawle; E/Gana; E/Karami; E/Ndyelu; Ebangi; Ebanti; Ebbo; Ebegi; Edo Baba; Edogi; Edotsu; Edugui Bawu; Egagi; Egbako; Egbanti; Ekota; Emi - Emidakosule; Emi Daga; Emi Datishi; Emi Emiworogi; Emi Gazhelati; Emi Gbodzu; Emi Gbogbonti; Emi Gorgo-Tifin; Emi Jike; Emi Kagba; Emi Kanda; Emi Kosunti; Emi Lukpa; Emi Manbaru; Emi Mangujaza; Emi Nadeji; Emi Nda Kotsu; Emi Ndafa; Emi Ndaleko; Emi Ndanuwan; Emi Ndashaba; Emi Nkonin; Emi Nkpayiko; Emi Poto; Emi Shaba; Emi Tete; Emi Tsadu; Emi Tsuyisa; Emi Tswayan; Emi Worokuso; Emi Zhutsu; Emi- Emidakosule; Emi- Evungi; Emi-?Worongi; Emi-Akpaki; Emi-Batagi; Emi-Bongi; Emi-Botan; Emi-Dawu; Emi-Dokociz; Emi-Dokocizhi; Emi-Dznazhi; Emi-Edosuerwayi; Emi-Ekpagi; Emi-Ewognsu; Emi-Gamu; Emi-Garako; Emi-Gawo; Emi-Gawo Iswari; Emi-Gawo Tswa; Emi-Gawo Tsysankpa; Emi-Gazhe; Emi-Gazhevata; Emi-Gbanditati; Emi-Gbogingi; Emi-Gbokota; Emi-Ghazhe Mu; Emi-Kokonkara; Emi-Kpansa-Nagi; Emi-Kpareji; Emi-Kpatadzupu; Emi-Kpatanti; Emi-Kpayi; Emi-Kucitagi; Emi-Kugi; Emi-Lagada; Emi-Lanfa; Emi-Likede; Emi-Luci; Emi-Majin; Emi-Makama; Emi-Makun; Emi-Mantawaki; Emi-Mantuaki; Emi-Manyisa; Emi-Masaki; Emi-Matswagi; Emi-Mayaki; Emi-Ndadzan; Emi-Ndagi Isa; Emi-Ndalikali; Emi-Ndanida; Emi-Ndarani; Emi-Ndasheshi; Emi-Ndashun; Emi-Ndaswanyan; Emi-Ndatsyiya; Emi-Ndayamma; Emi-Ndayiko; Emi-Poto; Emi-Sakpefu; Emi-Shaba Keji; Emi-Shabako; Emi-Tswaako; Emi-Tswanyan; Emi-Twaci; Emi-Uluko; Emi-Waki; Emi-Wodata; Emi-Wokali; Emi-Woro; Emi-Woro-Shaba; Emi-Worong (1); Emi-Worong (II); Emi-Worongi; Emi-Worongo; Emi-Yabindin; Emi-Yebosoko; Emi-Yekoko; Emidadocin; Emigi; Emikako; Emikarmu; Emiladan; EmiNdaceko; Emindaniya; Emitsu; Emitsuzuru; Emizhigici; Emu Mapa; Endekotsu; Enuta; Esungi; Etnudogo; Etsan; Etsu Woro; Etsu-Tasha; Evungi; Evuntagi; Eyagi; Ezhigi; Fada; Fadshi; Fanga; Fikun; Fitigi; G/Dancitagi; G/Kata; G/Tagi; Gaba; Gana mar; Gara; Gatagi; Gazhe; Gazhitu; Gbaci; Gbada-Gbadzu; Gbade; Gbaguda; Gbanagi; Gbancitagi; Gbangba; Gbanpin; Gbarigi; Gbencitgi; Gbenko; Gbeteru Tarwo; Gbodoti; Gbongonati; Gekpa; Giwa; Goga; Gogata; Gogata-Majin; Gogata-Tsadu; Goggata; Gogoti; Gonagi; Gudu Tako; Guduko; Gukuko; Guzan; Jangi; Jiga; Jina; Jipan; K/Kanzhi; K/Sokyara; K/Tagi II; Kabici; Kafetun; Kagowogi; Kakuti; Kangi; Kangi-Makun; Kanko; Kansanagi; Kapami; Katamba-Bologi; Keogi Sabo; Ketsa; Kinbokun; Kitsa Tifun; Kkpatagi I; Koccla; Kocitako; Koegi Tsofo; Kokogi; Kolowasa; Kolowoni; Kolozuru; Kotugi Dada; Kpambo; Kpankuruzhi B; Kpanzhi; Kpautasaci; Kpekpo; Kpenyeto; Kpizhi I; Kplitagi; Kpunkuruzhi; Kuci Yabata; Kuci-Woro; Kucitagi; Kudogi; Kukpagi; Kuna; Kuni-Awo; Kupafu; Kupe; Kuragba; Kuso Tachin; Kusodu; Kusogi; Kusotaci; Kutigi; Kutiwongi C; L/Fazhi; Labozhi; Lade Makun; Lafarma; Lafigagi; Lafiyagi; Lagun; Lagun Malogi; Lagun-Efuko; Lalo; Lamboeh; Lancikagi; Lanfagi; Langbata; Lanle; Lasagi; Latiko; Lazhi-Kolo; Legbo; Lelefu; Lukaro; Madi; Madodo; Mafoko; Maintwaki; Majidai; Majimkaji; Majin Gari; Majin-Kusoagi; Makufu; Makwafu; Makwagi; Makwako; Malungi; Mamagi; Mambe; Mamina; Mamuzhi; Mana; Manamama; Manyisa; Manzwakwa; Masaleci; Masha I; Masingo; Mawogi; Mazari; Miniko; Mucita; Mumuni; Nacita; Nadmanki; Nafogi; Nagyafu; Naike; Nambe-Jako; Nasaratu; Ndabo; Ndafuraki; Ndaijiko; Ndakehei; Ndaketsa; Ndako A; Ndakogitsu; Ndakogitsu A; Ndakolo; Ndalaba; Ndale; Ndaleutswa; Ndaloke; Ndarubu; Ndashaba; Ndawangwa; Ndayama; Nku; Nmamayi; Nnadindi; Nnadukun; Nnafeane; Nwakanuna; Pako Panti; Pantiwodata; Pat-Kasangi; Patigi-Shaba; Patigi-Waziri; Patignin; Pokpo; Potox; Rama; Ribiku; Rokota; Rugagi; Rugga; Rwakwa-Nda; Rwankwa; S/Ewowara; Sabo; Saci; Sacifu; Sakpe; Sakwa; Salwu; Sanmaji; Sansanu balo; Santali; Shaba Kaiji; Shaba Legbo; Shaba Maliki; Shaba Manma; Shabatu; Shakpetu; Shaku B; She Matsu; She-Katsa; She-Tsa; Shebe; Shebe Woro; Shegba; Sheshi; Sheshi Agba; Sheshi Madaki; Sheshi-Bikun; Shet; Sodangi; Sokomba; Sokyara Gabi; Sonfada; Sonmazair; Sopa; Swajiya; Swalagi; T/Baban; T/Kabagi; T/Karami; T/Mamudu; T/Tswada; Tabo I; Tabu Gari; Taci; Tada-Miliki; Tafian; Tafien; Tama; Tanaworo; Tate; Tatun; Tayuma; Teregi; Totomi; Tsadu; Tsadu Alokochi; Tsampa; Tsavni; Tsoegi; Tsun; Tswadzuru; Tswagba; Tswagi; Tswako; Tswance; Tswankiwagi; Tswashaworo (T.I); Tswatagi; Tswowo-Dzama; Tugi; Tumaka; Tunga D. Masha; Tunga Zavarna; Tutuntiko; Twaki 2; Twaki I; U/Sheti II; U/Sheti III; Ubaandoma; Uluko; Vuntako; Vunun; Wangwa; Washigi; Wochiko; Wodata; Wodiko; Woliko; Wuchi; Wulifa; Wunigi; Wunta; Wuya; Yakowodu; Yakudi-Kpangi; Yakudi-Tanko; Yalwa; Yebosoko; Yekoko; Yekosa; Yekotacingi; Yelwa; Yeti; Yezegha; Yidzuwugi; Yifengi; Z/Kencifu; Z/Majin; Zakari; Zhigati; Zhigun; Zhiluko; Zhiwu\n"
  ],
  [
    "Magama",
    "Auna",
    "923106",
    "Agido; Aiki; Akutu; Akwan Manke; Akwaru; Alunguci; Alura; Amale; Amali; Anaba; Andarai; Ang/ Dawa; Ang/Dakuza; Ang/Dan Auta; Ang/Dandariya; Ang/M. Bako; Ang/Nadawaju; Ang/Nasamu; Ang/Sansana; Anifani; Arhu; Asala-Karama; Asaya; Auna; Awanjabi; B.Zabgi; Balugu; D. Hili; Damale; Danladibiri; Finga; G. Fulani; G. Gona; G.Y. Alaucho; Galanzare; Gallehe; Gatagi; Gele; Gengi; Gilo; Gode; Gumbi; Gungawa; Hiriya; Inkwai; Ipama Bima; Iraba; Irama; Iriyan; Isama; Issale; Iteri; Jagura; Janyau; Kabara; Kada; Kafigo; Kaida; Kajabu; Kanfani; Karandadi; Kasuwan Ndaji; Kawo; Keriko; Kindawa; Kinkiya; Koso; Ksoshi; Kumbi Sani; Kwakolo; Kyau; Lade; Ladibin; Libale; Lofawa; Luhu; Luwo; M. Kawa; Mabunguri; Madaki; Madakin Koma; Madalo; Madalu; Madugu; Magana; Magashi; Magilk; Magumo; Mahara; Mahuta; Mahute; Maigoge; Majabu; Maje-Mabin; Majeme; Maketi; Makici; Makogi; Makuki; Makyalo; Malaga; Malela; Managara; Mangwaro; Mapapo; Maragwasa; Maranya; Matadangwani; Maundu; Mazakari; Momagi; Nnali; Old Izalo; Old Kaiabu; Old Magala; R. Akwai; R. kaba; R.Gora; Rafinahankachi; Raha; Rataya; Rikwanjen; Runtuwa Fulani; S. G. Gwagwade; S. Garafuni; S. Gare; S. Gumbi; S. Majinga; S. Manuta; S/Garin Bobi; Sarkwe; Shuwale; Suibonu; Sukuntuntunun; T. Ajiya; T. Angulu; T. Asala; T. Assisa; T. Audu; T. bala; T. bature; T. Bawa; T. Dandare; T. Danjuma; T. Gandi; T. Gano; T. Gere; T. Giwa; T. Gunzu; T. Gwonda; T. Hakeri; T. Ibrahim; T. isa; T. isale; T. Jibo; T. Jika; T. Joji; T. Kade; T. Kowa; T. M; T. M. Alu; T. M. Gengi\n"
  ],
  [
    "Magama",
    "Ibelu",
    "923105",
    "Abaka; Agille; Agumo; Akwau; Atabo; Azozo; Bado; Billi; Bukkawa; Buta; D.Dandare; D.Hill; D.Kidi; D.Saura; Dakkolo; Dankiyabu; Dautai; Doka; F.Hill; Farar Doka; G. Baluwa; G. Danboka; G. Gamo; G. Gamu; G. Kwanu; G. Magala; G. Magashi; G. Maigoge; G. Mutun Daya; G. Ubandakwaki; Gaji Barabade; Gari; Gwari; Hayi; Hinsawan-Kume; Ibeto; Ibili; Illela; Ipana; Itali; Jange; Jangu; Kadarko; Kura Gari; Kwanzokwanzo; Lagam; Lagunmo; Lujuru; Mabunya; Machinfa; Magaman Baji; Mahorondawa; Maigaraja; Mailanbu; Mara a; Masabu; Masamagu; Masanji; Matalengo; Nasko; Old Madusa; R. Daji; Rafin Fada; Shadadi; Shashunwa; T. Audu; T. Auta; T. Bagudu; T. Baha; T. Basu; T. Bukawa; T. Dogari; T. Galadima; T. Kade; T. Kambari; T. Kure; T. Magaji; T. Makeri; T. Mangworo; T. S. Fambo; T. W. Mahilo; T. Wakili; Takalafiay; U. .S. Fulani; U. B. Mai; U. Baguda; U. Bagudu; U. Bamago; U. Bande; U. Bauna; U. Bisalla; U. Burgu; U. Dambawa; U. Danjule; U. Dogo; U. Gado; U. Gishiri; U. Hussani; U. Kaddayui; U. Kambari; U. Kanda; U. kettu; U. Kibiya; U. Langi; U. Madalla; U. Maje; U. Maliki; U. Mallam; U. Mande; U. Noma; U. S. hardo; U. S. Noma; U. Shanu; U. W. Ladan; Wakili Gata; War; Yazariya; Ygwama\n"
  ],
  [
    "Mariga",
    "Koton Kobo",
    "922106",
    "Ang S/Fillani; Ang. Bangawa; Ang. Bingara; Ang. Citama; Ang. Damagata; Ang. Danbakwai; Ang. Dangami; Ang. Duda; Ang. Maisigari; Ang. Majiro; Ang. Mitauni; Ang. Nadaki; Ang. Rugu; Ang. Shekarau; Ang/Wakili; Asaya; Basaya; Bawa; Beri Gari; Bijagira; Bobi Gari; Danko; Dogon Dawa; Dorawai; Durugu; Dutsin Magaji; Dutsindosa; Fagai Sabuwa; Galma Sama; Ganda; Garin Mamba; Gauji; Geshe; Gudashi; Ibaru; Ifari Sabuwa; Igwama Gari; Indago; Inkwai; Iraba; Jarenbana; Kafigo; Kanfani; Kasuwan Ango; Kasuwan Dogo; Kasuwan Garba; Kawawu Gari; Kisisu; Kotonkoro; Kubaba; Kudungunai; Kukunga; Kunai; Kunugo; Kurigi; Kwanye; Magumo; Mahuta; Maigoge; Maketi; Makici; Mangwaro; Mariga Gari; Matari; Matseri; Maundu; Mkaura; Mudi; Murai; Rikwanjen; S/Garin; S/Garin Bobi; Saban Gurugu; Sabuwan; Tsohon Gari; Tumgan Maje; Tun. Mailaka; Tunku; Uanbaru; Ukuru; Ung/Makama; Unguwan Koto; Urama; Ushaman; Wamba; Yadi; Zabiya\n"
  ],
  [
    "Mariga",
    "Kumbashi",
    "922105",
    "Afaga; Bangi; Chuchu; Daguzu; G/Boka; Gabbas; Ibde; Isanga; Kakuza; Kasankici; Kazau; Kazau Ung-; Kuinme Gari; Kumbashi; Liwji; Mabinni; Mabirni; Maburya Fada; Mahoro Gari; Makyankyane; Mazame; Ragada; Runtuwa; T/Dutsi; U. Magaji; Ukata Banji; Ung. Dada; Ung. Dutsi; Ung. Fada; Ung. Galadima; Ung. Madawaki; Ung. S. Fulani; Ung. Ubandawaki; Ung. Wan ya; Ung. Waziri\n"
  ],
  [
    "Mashegu",
    "Mashegu",
    "923102",
    "Adabo; Adogo; Adogo Abase; Agiya Dadin; Akumu; Amungi; Ashiwa; Assan; Babagi; Babban Aso; Babban Rami; Bagada; Bakwai Bakwai; Bangi; Buzana; Cagwa; Dadin Kowa; Dokoki; Duba; Dutsimangaji; Gamu Gaku; Gwata Muma; Ibeton Kara; Jagira; Jaraku; Jemaku; Jigawa; Kaboji; Kalanto; Karkaka; Katati; Kawo; Konwan; Labije; Likyaule; Magma; Mahuta; Maibabban Doki; Makeri; Mashegu; Masudi; Masughi; Matande; Matane; Nagogo; Nasarawan; Nsarawa Lugge; S/Rijaya; Sassa; Soba; Tibamu; Tung Gusso; Tung Madabiya; Tung Maidoji; Tung Nabobi; Tung. Abba; Tung. Afaf-Saiwa; Tung. Ango; Tung. Baare; Tung. Barwa; Tung. Dakarkar; Tung. Damiwira; Tung. Dan; Tung. Dogo; Tung. Edima; Tung. Hussami; Tung. Inda; Tung. Ingilishi; Tung. Kanahu; Tung. Kassinawa; Tung. M. Haussinmi; Tung. Masara; Tung. Namadala; Tung. S/Noma-Masari; Tung. Sa are; Tung. Sabarma; Tung. Sami Naka; Tung. Tanangi; Tung. Usaman Kano; Tung. Wanzan; Tung. Zarunmi; Tung.Inwala; Tung.Jagaba; Tung.jiyya; Tung.Kura; Tung.Lelle; Tung.Madagu; Tung.Madawaki; Tung.Magaji; Tung.Maibanga; Tung.Mairakumi; Tung.Maisamari; Tung.Mudi; Tung.Namata; Tung.Rafingora; Tung.Tanko Tung.Ubandasaki; Ugimu; Ukaghu; Zanfara\n"
  ],
  [
    "Mashegu",
    "Zugurma",
    "923103",
    "/M/Tanto; Arewa; Awuru; Awuru Salkawa; Babagi; Baffan; Bakochi; Bakoshi; Bakwai; Bambafu; Bani Zumbu; Bawugi; Bazabalmo; Beji; Bishe Kashi; Bitagi; Bodinga; Bokota; Bonko Salwaka; Chafu; Chega; Cikogi; Cuwankumin; Daja; Danpangi; Danshe; Dapangi; Doka; Donko; Edam; Edan Mallam; Edogi; Ekwagi; Estagi; Etsagi; Faje; Fala Tako; Fala Tifi; Fanga; Fellagi; Gatakum; Gbogan; Gungawa; Gwaji; Hayin Buhari; Ibbi; Indamushi; Jibwangi; Jikimba; Jiya; Kachi; Kangon Mulo; Kanti; Kawatachi; Kawo Faje; Kawo mulo; Kiji; Kuda; Kulho; Kupa; Kuso; Kusoko; Kwabu; Kwaifawa; Kwantu; Kwatachi; Kwati; Kyangawa; Labin Shamu; Lafu; Leaba Salkowa; Lebba; Likoro; Mabima; Madubandaji; Magama Mulo; Mai Azara; Mai Azara Faje; Maikade; Majeme; Makuleshi; Manigi Kotare; Mapayi Mulo; Mararaban; Mash,; Mazakuka; Mule; Mulo Faje; Nasarawa; Nasarrawa Faje; Nbokugi; Pate; Patiko; Patiko Baki-Rafi; Patiko U/Makera; Pyi; Rijoyogi; Robu; Ruga; S/Garin Bisha; S/Garin Bokosta; S/Garin Yemi; S/Maigodiya; S/Mangara; S/Mashigi I; S/Mashigi II; S/pegi; S/Rijiya; S/Sari Ubegi; Sadugi; Saho Rami; Saikawa; Salkawa; Shafini; Shakade; T/Abu; T/Abudu; T/Ajiya; T/Alh. Banjima; T/Alhaji; T/Aliyu; T/Bakwai; T/Dan Iya; T/Danlando; T/Dashi; T/Dawa; T/Gara; T/Gero; T/Gobirawa; T/Gungawa; T/Gyara; T/Hassan; T/Ibrahim; T/Idirisu; T/Jagbba; T/Karo; T/Lamba Biyu; T/Liman; T/Mabdu Jiya; T/Magaji; T/Magamata; T/Mairiga; T/Maisamale; T/Miri; T/Musa; T/Raba Gardama; T/Sabon Leaba; T/Saidu Dule; T/Sami; T/Sammi; T/Wansan; T/Zabarma; Talle; Tung. Abba; U/Dukkawa; Ubegi; Uddu; Ung. Kodage; Ung. Maidawa; Ung. Sarki; Wadata; Yemi; Zuguma Yari\n"
  ],
  [
    "Mokwa",
    "Kede",
    "913103",
    "A. Aliyi; A. Aliyu; A. Ibrahim; A. Moh. Haya; Afugi; Agatu; Alh. Saidu; Bade; Banda; Batagi; Batangi; Camp; Cida Adua; Cikangi; Dakogi; Dakungi; Dalachi; Denfa Kuso; Dikko; Edan; Edolusa; Edugi; Egbagi; Ekpagi; Epa; Esunginda; Foti; Fulani; Ganamaru; Gbatagi; Gbogifu; Gboto Alfarma; Gudugi; Gunduko; Haruna Honad; Ibba; Irrigation; Jangi; Jebba; Jedan Life; Jiffu; Kagowogi; Kapataki; Karogi; Kodan; Koshaba; Koso Tsun; Kpacita; Kpaki; Kpata Nku; Kpetagi; Kukpanti; Kusoko Kota; Labozhi; Ladefu; Lafiyagi; Lafiyagi Ebigi; Lafu; Mahhanci; Mai Saje; Makatar S.; Mamma Yagba; Mamman Loko; Mawogi; Mureji; Musa Giwa; Mutari; Muwo; Ndafu; Ndafu Hausawa; Ndamaga; Ndanawu; Neieupa; Nwogi; Nyafu Olu; P/Shaba Kolo; Pati Zhiko; Rabba Mokwa; Rakun; Sheshi Shaba 1; Sheshi Shaba 2; Takuma; Tama Ai; Tanapa; Tatabu; TEKpagi; Tsafa; Tswanle; Tuna Hausawa; Tunga; Tyabo; U/Hakimi; Umaru; Umaru M.; Ungwar Dakari; Usman Bukka Tusman Hakimin; Wadat Uman; Yahwa\n"
  ],
  [
    "Mokwa",
    "Mokwa",
    "913104",
    "Alj. Maikumbo; Arma; Bado; Bali; Batagi; Bia Agi Eyi; Bijagi; Bokani; Bukka; Cattle Ranch; Dakpan; Egangi; Ekwa; Ezhi; Fadegi; G/Mai Bitagi; Gbajibo; Gunjigi; K/Bokun; Kagogi; Kalema; Kaniyan; Kpakiko; Kudu; Kumigi; Lafiyagi; Magun; Maraba II; Marraba; Mile-One; Mokwa; Ndayako; Ngpe Camp; Saw Mill; Shika; T/Alh. Musa; T/Jirgi Gari; Tab Gidan I; Tika; Tswakwagi; Tung Dukawa; Tuntuntiko; Wa Abim Azhi; Yakede Fimaye; Yalwa Zab\n"
  ],
  [
    "Munya",
    "Muyi",
    "921103",
    "Angunu; Beni; Chibani; Dandaudu; Dangunu; Daza; Fuka; G. Auta; Gini; Gwaderi; Kabula; Kazai; Sarkin-Pawa; Zaggaga\n"
  ],
  [
    "Paikoro",
    "Kafin Koro",
    "920104",
    "Abolo; Adunu; Agwa; Baani; Beji; Beni; Bukpasi; Chimbi; Danda; Egwa; Feri; Fiene; G. Bahago; G. Garuba; G. Gejere; G. Gwari; Gakoro; Gbajawi; Gwato; Ishau; Jibi Gida; Jpamako; Kafinkoro; Kakuri; Kamarini; Kapadna; Kuchiribi; Kuchis; Kudere; Kuka; Kumin Gwa; Kunukunu; Kurshi; Kutikwa; Kwagana; Kwakuau; Kwatuti; Miye; Nabw; Nanati; New Angnanpa; New Dakolo; Pinai; S. Gbusami; Shapkere; Shaudna; T. Amale; T. Dndu; T. Samari\n"
  ],
  [
    "Paikoro",
    "paiko",
    "920103",
    "Amini; Baidna; Bakajiba; Bambe; Buti; Chapa; Chawagi; Chawnara; Chefe; Damago; Damawopon; Dankele; Danu; Dogon Ruma; Dugba; Eloigi; Essan; Farindoki; Fenaleta; Fide; For a; Gangare; Gbam; Gbansegodan; Gbeite; Gbodna; Gemi; Guada; Gugo; Guto; Gwali; Gwam; Gwara; Gwari; I. Komo; Isan; Isari; Jatau; Jatayi; Jedna; Jere; Jinboi; Kaikuta; Knatu; Kuchisara; Kwachi; Kwakuti; Kwanpi; Laitapi; Latuto; Lukochi; Lukopi; M. Yaro; Mikweji; Mkuchi; Mugi; Mukapa; Muye; Nago; Nagopita; Ndayma; Nubipe; Nusupi; Paiko; Panshe; Peta; Pisiyingbo; Raboji; Ratati; S. Gwari; Sabo Gida; Sala; Sapai; Seita; Sesita; Shai; T/Mago; T/mallam; Takumpara; Tanu; Tau; Tutungo; Wabe; Yida; Zaje; Zuru\n"
  ],
  [
    "Rafi",
    "Guna",
    "922102",
    "Abidi; Ajimi; Akusu; G. Majaman; Garungabas; Guna; Gunugu; Guria; Gushi; Jangaru; Jimawa; Kato; Kundu; Kwange; Lelemu; Pangu; Sheta; T. Maijaki; T. Mauzu; Ushama; Yakila\n"
  ],
  [
    "Rafi",
    "Kusheri",
    "922103",
    "G.Abaki; Afilamaza; Bakura; Barkin Koci; Bisama; Bisura; Canye; D. Mainono; Dasa; G. B. Wakili; G. Bagugu; G. Baji; G. Bidawa; G. Bwabiyu; G. Dangana; G. Dankanu; G. Gajere; G. Haruna; G. Kadaku; G. Koko; G. Maidoka; G. Maidugu; G. Maima; G. Myau; G. Sualia; G. Tawai; G. Telu; G. Ukuru; G. W. Mmaturu; G. Wagari; G.. S. usama; G.Danjuma; G.Dogonkagari; G.Gamahemari; G.Jibomakeri; Gidigori; Godere; Jakiri; K. Kano; Karaku; Kashuwa; Keke; Kofanpawa; Kugu; Kukoki; Kusheriki; Masuku; Moogo; S. Gida; S. ukusu; Sambuga; Shamuyambu; T. Bako; Tukunguna; U. Hamza; U. Sani; U. Toro; Ufwaka; Ukushe; Ukusu; Uregi; Ushama; Zari\n"
  ],
  [
    "Rafi",
    "Kwon Goma",
    "922104",
    "Dan-Gwasa; Dogonfili; G. Auta; G. Biyuboki; G. Dangaladima; G. Dassa; G. Galadima; G. Jatau; G. Kalia; G. Kuyambana; G. Maiduku; G. Nakada; G. Sarkinoma; G.Masira; G.Wusheynu; Gabi; Ganye; Kwongoma; Maikujeri; Mangoro; Pandogori; Ringa; T. Makeri; Uranciki; Ussiba\n"
  ],
  [
    "Rafi",
    "<a href=\"https://en.wikipedia.org/wiki/Tegina\" title=\"Tegina\">Tegina</a>",
    "922101",
    "Agwai; Ankawa; B. Gona; Bangu; Biito; D. Padama; Dada; G. Abashi; G. Angu; G. Barau; G. Danbiki; G. Dangama; G. Dangoru; G. Danjuma; G. Dijimakert; G. Jada; G. Katina; G. Kushama; G. Maiganga; G. Maikangara; G. Manzo; G. Tanko; G. Wakayi; G. Wani; G. Zubdomgi; Gende; Gini; Gisisi; Godora; Gulangi; Gunugu; Halatayi; Indaki; Inga; Inga Gari; Jambaka; Jiro; K. Madaka; Kagara; Kakuri; Katako; Kuru; Kwana; Luaga; Machinanugu; Madagwa; Mahanga; Natsina; Rubo; Rubu; Sabon Gari; Samboro; Sufawa; T. Ceshi; T. Duste; Tegina; Tunma; U. Alhaji; U. Uban-Dawaki; U.Butsi; Ugu; Ussa; Wayan; Yalwa\n"
  ],
  [
    "Rijau",
    "Rijau",
    "923104",
    "]Korem; A. Ulo; Abaka; Abara Mallam; Abba Ushe; Abonu; Adamu; Adande; Adara; Addaro; Aduwa; Afka; Agwale; Alamga; Alanga Kure; Anaina; Angu; Anna; Anyau; Anyo; Arida Gare; Arigida; Ashama; Ashingi; Ayawu; Ayituwo; B. Anma; Babba Zaure; Badukike; Bagasa; Bakin Dutsi; Bambadawa; Baro; Bashuwa; Berje; Buni; Chinama; Chitunu; D. Bukkdcio; D. Taru; Daguni; Dakibiyu; Damana; Dandagi; Dandawa; Dangi; Danrangi; Danrimi; Darga; Dima; Diriya; Diyanfura; Dlanko; Dofawa; Doka; Dugge; Duku; Etku; Farin Dutse; Farin Rawu; Faskaregiwa; G. Bature; G. Bawa; G. Boka; G. Gatama; G. Jambior; G. Kambari; G. Kanubari; G. Kura; G. Maiyaki; G. Mallam; G. Siga; G. Sura; Gaimako; Gainako; Gamini; Gazuma; Genu; Gida; Gidan Sule; Gimbiru; Godo; Gwagarade; Hali Awaga; Hamyu; Hodi; Huwa; Ibeto; Idachi; Ifaki; Ifana; Igerbu; Inana; Iri; Irijau; Isgor; Iskoromo; Itoki; Jama Are; Jatau; Jato Mando; K. Gada; Kabo; Kacheri; Kafar; Kambari; Kandi; Kardu; Karma; Kaukoromo; Kirfo; Kirya; Kisanu; Kode Ukku; Kogo Kifi; Korso; Kuda; Kunte; Kusa; Kuye; Kwabo; Kwarambe; M. Tsdo; M/Kambari; Magama; Magwinko; Mahela Fulani; Maiwa; Maizale; Maje; Majuta; Makana; Makaranta; Maker; Malingo; Mallam-Bawa; Mamba; Managsu; Marando Mariri; Masama Uli; Masuga; Matane; Matituta; Matwando; Mazabo; Mazobo; Nakacheri; Nimbiri; Odoshin; Okongo; Old Yakana; Paujan; Rigolo; Rijau; Rijiman Bature; Rimi; Riwo; Rugan Gabas; Rugar Chibau; Ruggan Jee; Rukkukiye; Rukukuje; Rukwane; Runfuwa; Runji; Rutuwan Kalido; S. G. Sullubawa; S. G. Ushe; S. Ganda; S/Saro; Sakaba; Sanoma; Shadadi; Shagwa; Sham; Shambo; Sindiri; Sori; T. Anyo; T. Auta; T. B. Bmakeri; T. Bali; T. Bella; T. Bunu; T. Danda; T. Dogo; T. Fona; T. Gongo; T. Kago; T. Kuka; T. Magagi; T. Magaji; T. Magajiya; T. Makeri; T. Managoro; T. Mangwan; T. Marigwaro; T. Mildo; T. Noma; T. S. Shanji; T. s. Ushe; T. Sambo; T. U. Dangiye; T. Yando; T. Yero; Takalifiya; Takari; Targa; Tarkuye; Taroro; Tatau; Tise; Tsamiya; Tsaniya; Tudunkaka; Tukura; U. Abarushi; U. Agulu; U. Abire; U. Abite; U. Adamu; U. Akoti; U. Alh. Buba; U. Alhel; U. Ali; U. Angulu; U. Audu Idadu; U. Auta; U. B. Zuare; U. Baba; U. Bagasa; U. Bagudu; U. Bahago; U. Bajida; U. Bani; U. Barmako; U. Bawa; U. Bebeji; U. Bisalla; U. Chibi; U. Chindo; U. Chora; U. Cinta; U. D. Fada; U. D. Musa; U. Dahoro; U. Dahur; U. Daji; U. Dakkarberi; U. Dakkawa; U. Damgaladima; U. Dande; U. Danguibi; U. Danladi; U. Dara; U. Daudu; U. Diga; U. Dogo; U. Dutse; U. Ebo; U. F. Amako; U. Fanu; U. Faru; U. Fona; U. G. Ajiya; U. Gadi; U. Gaiye; U. Galadima; U. Gamau; U. Ganwo; U. Garo; U. Geile; U. Gog; U. Gwazu; U. H. Shanfir; U. Hansawa; U. Harda; U. Hausa; U. Himji; U. Hoda; U. Ichche; U. Istumtun; U. Ka da; U. kambari; U. Kaurfu; U. Kazuwa; U. Kibiya; U. Kura Idaci; U. Kwaire; U. Kwakwara; U. Kwali; U. Kwando; U. Lamba; U. Liman; U. Luddayi; U. M. Babe; U. M. Sambo; U. Madalla; U. Magaji; U. Magajirange; U. Maganu; U. Magasiulu; U. N. Bawa; U. S. Dikko; U. S. Genu; U. S. Hausawa; U. S. Noma; U. S. Tsahi; U. Zuru; U.Aboki; U.Kebo; U.S. Chibadi; Udaru; Ugando; Ugira; Utamba; Utudu; Wanda; Warari; Wassarawa; Yakama; Zanfarawa; Zomo\n"
  ],
  [
    "Shiroro",
    "Galkogo",
    "921102",
    "Abaku; Agumi; Agwanggi; Aiwa; Akwaki; Aleji; Allawa; Ayaba; Bassa; Batako; Berago; Bikwo; Burwayi; Chinwanya; Chiwayu; Chukuba; Daggan; Dami Dami; Danumi; Dogwashi; Durni; Ealali; Erena; Falele; G. Sarkin; G. Baguda; G. Bako; G. Galadima; G. Idi; G. Kama; G. Kogo; G. Maaji; G. Maikomo; G. Maimo; G. Sarki; G. Umaru; G. Usisi; G. Zamfara; Godogodo; Guadguri; Gudo; Gurmana; Gwagwaulu; Gwama; Gwassa; Ibunu; Jabki; Jangara; K. Doma; K. pada; K/ Gurumai; Kabagu; Kalagai; Kalia; Kambari; Karki; Kasuman Kwaki; Kawo; Kazuma; Kpakari; Kuchid; Kudodo; Kukoki; Kundimdna; Kurebe; Kurebi; Kurusu; Kushaka; Kwaiki; Kwaiko; Laban; Ladmana; Lugga; Lukupe; Maganda; Makera; Mangwai; Manta; Mokuri; Musuku; Nakinde; Numa; Roro; S. Gari; Safari; Shafi; Sunnayu; T. Garba; T. Gora; Tambaji; Tatu; U. Chirau; Zangono\n"
  ],
  [
    "Shiroro",
    "Kuta",
    "921101",
    "Daboye; A. Kolo; Abera; Adnami; Agwagwa; Aje; Amuku; Apomi; Asha; Awolo; Badampa; Bagnape; Baguna; Baku; Bakuchi; Bangajiya; Bawa; Bawaki; Bayko; Bushimi; Cachala; Chapai; Chik Wale; Chimbi; D. Kofa; Demi; Dnalepe; Dnawi; Dugo; Dumi; Ebba; Egba; G. Gonday; G. Akawu; G. Alugoy; G. Baroe; G. Basakuri; G. Dalawi; G. Dibata; G. Galadima; G. Gazoma; G. Guwa; G. Jiko; G. Kabori; G. Kurumbe; G. Kwabaita; G. Kwato; G. Laydna; G. Madaki; G. Mayo; G. Musa; G. Mutundaya; G. Pinayi; G. Sama; G. Sugbi; G. Sule; G. Tapi; G. Tuguru; G. Tukwo; G. Wakili; G. Wambai; G. Yarmasama; G. Zar; G. Zarumai; G. Zarumaji; G.Bakai; G.Barga; G.Karba; Gbakopoi; Gijiwa; Gilwa; Gunu; Gurusu; Gusoro; Gwada; Gwadna; Gwarame; Igu; Ikanpini; Ikwa; Jataye; Kafa; Kakuru; Kamache; Kamari; Kami; Kapana; Katipe; Kato; Kongo; Kperi; Kubi; Kuchehuru; Kuchi; Kudami; Kudodna; Kufe; Kukuwari; Kulumi; Kuna; Kuno; Kurmi; Kushayi; Kushi; Kuta; Kutitibi; Kwamie; Kwochi; Lappa; Lowa; Lukuma; Lukumbasa; Luma; Magayeba; Maiganga; Maikakaki; Makama; N. Gurusupe; Nabi; Nako; Naza; Nungbai; Obaba; Piwa; Rafin Kuta; Rowo; Sabongida; Sakwata; Shaga; Shakada; Shakwati; She; Shinoro; Shiri; Sumaila; T-Dama; T. Sawadna; T. Wakili; Tagnari; Tankita; Taya; Tepai; Twalayi; U. Agmay; U. Kwaipe; U. Kwase; Ubandoma; Ugba; Yadna; Yanuako; Zuba\n"
  ],
  [
    "Suleja",
    "Suleja",
    "910101",
    "Apia; Buru; Burum; Bwoi; Chimbi; Chizako; Dachine; Dwakoro; Gauraka; Gupena; Gusun; Ibo; Ikume; Jigbodo; Kopu; Kuchin Pwele; Kutudibi; Kwalada; Kwamba; Kwankashe; Lafu; Madalla; Madugu; Maje; Muran; Nabulic; Numewa; Padawa; Rafin Kaffi; Shingere; Suleja; Tunga Gwuntu; Yagun; Yaldna; Zahehna\n"
  ],
  [
    "Tafa",
    "Tapa",
    "910103",
    "Dogon-Kurmi; Garam; Ija; Iku; Jakoro; New Bwari; Wuse; Zuma\n"
  ],
  [
    "Wushishi",
    "Wushishi",
    "922107",
    "Dagbaiko; Akare; Alkollko; Ashishi; Bada Mai Tulu; Bankwagi; Barwa; Batan-Ndaba; Bayan_Gayi; Begi; Bumigi; Butuyi; Buzu; Cheji; Dabbo; Dabiti Woro; Dankumagi; Dogan Ruwa; Dukusakun; Dunyutugi; Emi-Shiru; Emiworo; Enagi; Erina; Fugagi; Gadan Merke; Gboyagi; Gekun; Gidan Pangu Ndac; Gidan Pangu Toko; Gidan-Pangu; Girin; Gudi; Gwasakun; Indiga; Jankwata; Kacha; Kado; Kalakala; Kaliko; Kanankogi; Kanfanin Kirya; Kankara; Kanko; Kantin Kwari Hausawa; Kanwa; Katuna; Kutai; Kutunku; Kutunkwaci; Kwankwagi; Kwaragi; Kwata Chedu; Liala Hausawa; Lokjogoma; Madegi; Makera; Makusudi; Matajiya; Mato; Nadasako; Naganu; Nda-Ganshi; Nda-Sara; Nda-Shanko; Ndace-Mamman; Ndace-Shanko; Ndaka-Gisau; Pakara Gari; Pakara Tasha; Pasa; Sabongari; Saidan; Saminaku; Sancigi; Shaku; Tashan Dirigi Agwa; Tsogi; Tundun Alumu; Tung. Kano; Tunga; Tunkunji; Un. Sarkin Baka; Ung. Madaki B; Ung. Alkali; Ung. Anarwa; Ung. Barawa A; Ung. Barawa B; Ung. Madaki A; Ung. Maje; Ung. Makeri; Ung. Mallam Lawal; Ung. Pangu; Ung. Rimi; Ung. Tukura; Ung. Tura; Ung. Undako; Ushiba; Utare; Wodata Hausawa; Wushishi; Yakaji; Yalwa; Yamigi; Zargin Hausawa\n"
  ]
]
console.log(raw.length)
let data:  any[] = []
let minnaFile = path.join(PUBLIC_DIR, 'minna.json')
if (!fs.existsSync(minnaFile)) {
  console.log('Creating minna.js')
  delete raw[0] // this is the table header
  data = raw.map((row, index) => {
    let [name, district, code, villages] = row
    return {
      lga: name,
      district: district,
      zip: code,
      villages: villages.split(";").map(v => v.replace('\n', '').trim())
    }
  })
  // check if minna .js file exists in PUBLIC_DIR folder if write data to it as a json file
  fs.writeFileSync(minnaFile, JSON.stringify(data))
}

export default data