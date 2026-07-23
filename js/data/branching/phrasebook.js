// ============================================================================
// Quick-Practice phrasebook — the "easy way" to add lots of content at scale.
//
// Instead of authoring a full branching graph, each entry is one compact
// [german, turkish] tuple grouped by place → topic → CEFR level. A tiny
// builder flattens them into practice items the Quick Practice screen scores
// with the SAME speech recognizer + scorer + TTS as Story Mode. Adding 20 more
// phrases is literally 20 more one-line tuples — no engine or UI changes.
//
// PhraseItem = { id, en, tr, level, locationId, topic }  (`en` = target lang)
// ============================================================================

// place → topic → { LEVEL: [[de, tr], ...] }
const RAW = {
  hotel: {
    'Check-in & rezervasyon': {
      A1: [
        ['Ich habe eine Reservierung.', 'Bir rezervasyonum var.'],
        ['Mein Name ist Alex Turner.', 'Adım Alex Turner.'],
        ['Hier ist mein Pass.', 'İşte pasaportum.'],
        ['Ein Zimmer für zwei Nächte, bitte.', 'İki geceliğine bir oda, lütfen.']
      ],
      A2: [
        ['Ich möchte gern einchecken, bitte.', 'Giriş yapmak istiyorum, lütfen.'],
        ['Ist das Frühstück im Preis inbegriffen?', 'Kahvaltı fiyata dahil mi?'],
        ['Um wie viel Uhr ist der Check-out?', 'Çıkış saati kaçta?'],
        ['Könnte ich ein Zimmer mit Aussicht haben?', 'Manzaralı bir oda alabilir miyim?']
      ],
      B1: [
        ['Wäre ein später Check-out möglich?', 'Geç çıkış mümkün olur mu?'],
        ['Haben Sie für heute Nacht noch Zimmer frei?', 'Bu gece için boş odanız var mı?']
      ]
    },
    'Sorunlar & istekler': {
      A2: [
        ['Könnte ich ein paar extra Handtücher haben?', 'Biraz fazladan havlu alabilir miyim?'],
        ['Wie ist das WLAN-Passwort?', 'Wi-Fi şifresi nedir?'],
        ['Die Klimaanlage funktioniert nicht.', 'Klima çalışmıyor.']
      ],
      B1: [
        ['Leider ist das Zimmer nebenan sehr laut.', 'Maalesef yan oda çok gürültülü.'],
        ['Mein Zimmer wurde noch nicht geputzt.', 'Odam henüz temizlenmedi.'],
        ['Könnte mir jemand mit dem Gepäck helfen?', 'Bavulumla biri yardım edebilir mi?']
      ]
    }
  },

  airport: {
    'Check-in & bagaj': {
      A1: [
        ['Hier ist meine Bordkarte.', 'İşte biniş kartım.'],
        ['Ich habe eine Tasche zum Aufgeben.', 'Check-in için bir bavulum var.'],
        ['Wo ist das Gate?', 'Kapı nerede?']
      ],
      A2: [
        ['Ich checke für den Flug nach Rom ein.', 'Roma uçuşu için check-in yapıyorum.'],
        ['Ist mein Gepäck über dem Gewichtslimit?', 'Bavulum ağırlık limitini aşıyor mu?'],
        ['Könnte ich bitte einen Fensterplatz haben?', 'Cam kenarı koltuk alabilir miyim, lütfen?']
      ],
      B1: [
        ['Ist eine digitale Bordkarte in Ordnung?', 'Dijital biniş kartı geçerli mi?'],
        ['Wie hoch ist die Übergepäckgebühr?', 'Fazla bagaj ücreti ne kadar?']
      ]
    },
    'Sorunlar': {
      B1: [
        ['Mein Anschlussflug hatte Verspätung.', 'Aktarma uçuşum rötar yaptı.'],
        ['Ich glaube, ich habe meinen Flug verpasst.', 'Sanırım uçuşumu kaçırdım.'],
        ['Könnten Sie mich auf den nächsten Flug setzen?', 'Beni bir sonraki uçağa alabilir misiniz?'],
        ['Mein Koffer ist nicht auf dem Band angekommen.', 'Valizim banttan çıkmadı.']
      ],
      B2: [
        ['Da die Verspätung Ihre Schuld war, erwarte ich keine Umbuchungsgebühr.', 'Rötar sizin hatanız olduğu için yeniden rezervasyon ücreti beklemem.']
      ]
    }
  },

  restaurant: {
    'Sipariş verme': {
      A1: [
        ['Einen Tisch für zwei, bitte.', 'İki kişilik bir masa, lütfen.'],
        ['Kann ich die Speisekarte sehen?', 'Menüyü görebilir miyim?'],
        ['Ich nehme das Hähnchen, bitte.', 'Tavuğu alacağım, lütfen.'],
        ['Nur Wasser für mich, danke.', 'Bana sadece su, teşekkürler.']
      ],
      A2: [
        ['Was würden Sie empfehlen?', 'Ne önerirsiniz?'],
        ['Könnten wir noch ein paar Minuten haben?', 'Birkaç dakika daha alabilir miyiz?'],
        ['Enthält dieses Gericht Nüsse?', 'Bu yemekte fındık/fıstık var mı?']
      ],
      B1: [
        ['Ich bin allergisch gegen Meeresfrüchte, das lasse ich also weg.', 'Deniz ürünlerine alerjim var, o yüzden ondan uzak duracağım.']
      ]
    },
    'Ödeme & sorunlar': {
      A2: [
        ['Könnten wir bitte die Rechnung haben?', 'Hesabı alabilir miyiz, lütfen?'],
        ['Kann ich mit Karte zahlen?', 'Kartla ödeyebilir miyim?'],
        ['Der Rest ist für Sie.', 'Üstü kalsın.']
      ],
      B1: [
        ['Entschuldigung, aber das habe ich nicht bestellt.', 'Üzgünüm ama bu sipariş ettiğim şey değil.'],
        ['Das Essen ist leider etwas kalt.', 'Maalesef yemek biraz soğuk.']
      ]
    }
  },

  cafe: {
    'Tezgahta': {
      A1: [
        ['Einen Kaffee, bitte.', 'Bir kahve, lütfen.'],
        ['Kann ich eine Tasse Tee haben?', 'Bir fincan çay alabilir miyim?'],
        ['Zum Mitnehmen, bitte.', 'Dışarı alacağım, lütfen.'],
        ['Wie viel kostet das?', 'Ne kadar?']
      ],
      A2: [
        ['Ich nehme einen großen Latte, bitte.', 'Büyük boy bir latte alacağım, lütfen.'],
        ['Haben Sie Hafermilch?', 'Yulaf sütünüz var mı?'],
        ['Könnte ich das mit weniger Zucker bekommen?', 'Onu daha az şekerli alabilir miyim?']
      ]
    },
    'İnsanlarla tanışma': {
      B1: [
        ['Es ist ewig her — wie geht es dir?', 'Çok uzun zaman oldu — nasılsın?'],
        ['Was für ein Zufall, dich hier zu sehen!', 'Seni burada görmek ne tesadüf!'],
        ['Sollen wir uns einen Tisch nehmen und quatschen?', 'Bir masa tutup sohbet edelim mi?']
      ]
    }
  },

  hospital: {
    'Belirtileri anlatma': {
      A1: [
        ['Ich fühle mich nicht gut.', 'Kendimi iyi hissetmiyorum.'],
        ['Ich habe Kopfschmerzen.', 'Başım ağrıyor.'],
        ['Mein Hals tut weh.', 'Boğazım ağrıyor.']
      ],
      A2: [
        ['Ich habe seit gestern Fieber.', 'Dünden beri ateşim var.'],
        ['Die Schmerzen haben vor zwei Tagen angefangen.', 'Ağrı iki gün önce başladı.'],
        ['Mir wird schwindelig, wenn ich aufstehe.', 'Ayağa kalkınca başım dönüyor.']
      ],
      B1: [
        ['Ich fühle mich völlig erschöpft und kann nicht schlafen.', 'Çok bitkin hissediyorum ve uyuyamıyorum.'],
        ['Ich habe eine Schmerztablette genommen, aber sie hat nicht geholfen.', 'Ağrı kesici aldım ama işe yaramadı.']
      ]
    },
    'Randevular': {
      A2: [
        ['Ich möchte gern einen Termin machen.', 'Randevu almak istiyorum.'],
        ['Wann soll ich wiederkommen?', 'Ne zaman geri gelmeliyim?']
      ]
    }
  },

  pharmacy: {
    'İlaç alma': {
      A1: [
        ['Ich bin erkältet.', 'Üşüttüm.'],
        ['Haben Sie etwas gegen Husten?', 'Öksürük için bir şeyiniz var mı?']
      ],
      A2: [
        ['Könnten Sie etwas gegen Halsschmerzen empfehlen?', 'Boğaz ağrısı için bir şey önerebilir misiniz?'],
        ['Wie oft soll ich das nehmen?', 'Bunu ne sıklıkta almalıyım?'],
        ['Ich möchte dieses Rezept einlösen.', 'Bu reçeteyi doldurtmak istiyorum.']
      ],
      B1: [
        ['Macht dieses Medikament müde?', 'Bu ilaç beni uykulu yapar mı?'],
        ['Kann man es unbedenklich zum Essen nehmen?', 'Yemekle almak güvenli mi?']
      ]
    }
  },

  supermarket: {
    'Bulma & satın alma': {
      A1: [
        ['Wo ist die Milch?', 'Süt nerede?'],
        ['Wie viel kostet das?', 'Bu ne kadar?'],
        ['Haben Sie Brot?', 'Ekmeğiniz var mı?']
      ],
      A2: [
        ['In welchem Gang sind die Eier?', 'Yumurtalar hangi koridorda?'],
        ['Verkaufen Sie glutenfreie Produkte?', 'Glutensiz ürün satıyor musunuz?'],
        ['Kann ich hier mit Karte zahlen?', 'Burada kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Entschuldigung, ich glaube, das wurde mir doppelt berechnet.', 'Pardon, sanırım bunun için iki kez ücret alındı.']
      ]
    }
  },

  clothing: {
    'Kıyafet alışverişi': {
      A1: [
        ['Kann ich das anprobieren?', 'Bunu deneyebilir miyim?'],
        ['Haben Sie das in M?', 'Bunun orta bedeni var mı?'],
        ['Wie viel kostet diese Jacke?', 'Bu ceket ne kadar?']
      ],
      A2: [
        ['Haben Sie das in einer anderen Farbe?', 'Bunun farklı bir rengi var mı?'],
        ['Das ist ein bisschen zu eng.', 'Bu biraz fazla dar.'],
        ['Wo sind die Umkleidekabinen?', 'Deneme kabinleri nerede?']
      ],
      B1: [
        ['Ich möchte das zurückgeben — es passt nicht.', 'Bunu iade etmek istiyorum — bana olmadı.'],
        ['Kann ich es gegen eine größere Größe umtauschen?', 'Daha büyük bir bedenle değiştirebilir miyim?']
      ]
    }
  },

  train: {
    'Biletler & seyahat': {
      A1: [
        ['Eine Fahrkarte nach London, bitte.', 'Londra’ya bir bilet, lütfen.'],
        ['Welches Gleis ist es?', 'Hangi peron?'],
        ['Um wie viel Uhr fährt der Zug ab?', 'Tren saat kaçta kalkıyor?']
      ],
      A2: [
        ['Eine Rückfahrkarte, bitte.', 'Gidiş-dönüş bilet, lütfen.'],
        ['Wann fährt der nächste Zug in die Stadt?', 'Şehre bir sonraki tren ne zaman?'],
        ['Ist dieser Platz besetzt?', 'Bu koltuk dolu mu?']
      ],
      B1: [
        ['Gibt es einen Studentenrabatt?', 'Öğrenci indirimi var mı?'],
        ['Ich glaube, ich bin in den falschen Zug gestiegen.', 'Sanırım yanlış trene bindim.']
      ]
    }
  },

  taxi: {
    'Taksiye binme': {
      A1: [
        ['Zum Flughafen, bitte.', 'Havalimanına, lütfen.'],
        ['Wie viel kostet es?', 'Ne kadar?'],
        ['Halten Sie hier, bitte.', 'Burada durun, lütfen.']
      ],
      A2: [
        ['Könnten Sie mich zum Hotel Sunrise bringen?', 'Beni Sunrise Otel’e götürür müsünüz?'],
        ['Ich bin etwas in Eile.', 'Biraz acelem var.'],
        ['Kann ich mit Karte zahlen?', 'Kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Könnten Sie bitte die schnellste Route nehmen?', 'En hızlı yoldan gider misiniz, lütfen?']
      ]
    }
  },

  bank: {
    'Bankada': {
      A2: [
        ['Ich möchte ein Konto eröffnen.', 'Bir hesap açmak istiyorum.'],
        ['Ich muss etwas Geld wechseln.', 'Biraz para bozdurmam gerekiyor.'],
        ['Wie ist der Wechselkurs heute?', 'Bugün döviz kuru nedir?']
      ],
      B1: [
        ['Ich glaube, ich habe meine Bankkarte verloren.', 'Sanırım banka kartımı kaybettim.'],
        ['Da ist eine Zahlung, die ich nicht kenne.', 'Tanımadığım bir ödeme var.'],
        ['Könnten Sie bitte meine Karte sperren?', 'Kartımı bloke edebilir misiniz, lütfen?']
      ]
    }
  },

  police: {
    'Bildirimde bulunma': {
      B1: [
        ['Ich möchte ein verlorenes Handy melden.', 'Kayıp bir telefon bildirmek istiyorum.'],
        ['Ich glaube, meine Tasche wurde gestohlen.', 'Sanırım çantam çalındı.'],
        ['Es ist vor ungefähr einer Stunde passiert.', 'Yaklaşık bir saat önce oldu.'],
        ['Könnte ich eine Kopie der Anzeige bekommen?', 'Tutanağın bir kopyasını alabilir miyim?']
      ],
      B2: [
        ['Ich brauche dieses Dokument für meinen Versicherungsantrag.', 'Bu belge sigorta talebim için gerekecek.']
      ]
    }
  },

  street: {
    'Yol tarifi & sohbet': {
      A1: [
        ['Entschuldigung, wo ist der Bahnhof?', 'Pardon, istasyon nerede?'],
        ['Ist es weit von hier?', 'Buraya uzak mı?'],
        ['Danke für Ihre Hilfe.', 'Yardımın için teşekkürler.']
      ],
      A2: [
        ['Können Sie mir sagen, wie ich zum Museum komme?', 'Müzeye nasıl gideceğimi söyler misiniz?'],
        ['Gibt es hier in der Nähe eine Apotheke?', 'Buralarda bir eczane var mı?'],
        ['Freut mich. Ich bin neu hier.', 'Tanıştığıma memnun oldum. Buraya yeniyim.']
      ],
      B1: [
        ['Könnten Sie mir sagen, wo die nächste Bank ist?', 'En yakın bankanın nerede olduğunu söyler misiniz?'],
        ['Möchtest du mit uns einen Kaffee trinken?', 'Bize kahveye katılmak ister misin?']
      ]
    }
  },

  workplace: {
    'Görüşmeler & ofis': {
      B1: [
        ['Danke für die Einladung zum Gespräch.', 'Görüşmeye davet ettiğiniz için teşekkürler.'],
        ['Ich habe drei Jahre Erfahrung in diesem Bereich.', 'Bu alanda üç yıllık deneyimim var.'],
        ['Könnten Sie mir mehr über die Stelle erzählen?', 'Bu pozisyon hakkında biraz daha bilgi verir misiniz?']
      ],
      B2: [
        ['Früher habe ich zu viel übernommen, aber ich lerne zu delegieren.', 'Eskiden fazla iş üstlenirdim ama yetki devretmeyi öğreniyorum.'],
        ['Wie sieht Erfolg in den ersten sechs Monaten aus?', 'İlk altı ayda başarı neye benzer?'],
        ['Ich glaube, da gab es ein Missverständnis — lassen Sie es mich erklären.', 'Sanırım bir yanlış anlaşılma oldu — açıklayayım.'],
        ['Lösen wir das zusammen.', 'Bunu birlikte çözelim.']
      ]
    }
  },

  home: {
    'Günlük ev sohbeti': {
      A1: [
        ['Guten Morgen! Hast du gut geschlafen?', 'Günaydın! İyi uyudun mu?'],
        ['Was gibt es zum Frühstück?', 'Kahvaltıda ne var?'],
        ['Ich bin noch etwas müde.', 'Hâlâ biraz yorgunum.'],
        ['Bis später!', 'Sonra görüşürüz!']
      ],
      A2: [
        ['Was hast du heute vor?', 'Bugün planların ne?'],
        ['Willst du zusammen zum Markt gehen?', 'Birlikte pazara gitmek ister misin?'],
        ['Kannst du mir bitte damit helfen?', 'Bunda bana yardım eder misin, lütfen?']
      ]
    }
  }
};

// Second batch — same compact format. Kept separate purely so the file stays
// easy to scan; merged with RAW below. Adding more content = add more tuples.
const RAW_EXTRA = {
  hotel: {
    'Resepsiyonda dahası': {
      A2: [
        ['Könnten Sie mir für acht Uhr ein Taxi rufen?', 'Saat sekiz için bana bir taksi çağırır mısınız?'],
        ['Gibt es im Hotel ein Fitnessstudio oder einen Pool?', 'Otelde spor salonu ya da havuz var mı?'],
        ['Um wie viel Uhr öffnet das Restaurant?', 'Restoran saat kaçta açılıyor?'],
        ['Könnte ich meine Taschen bis mittags hier lassen?', 'Bavullarımı öğlene kadar burada bırakabilir miyim?']
      ],
      B1: [
        ['Ich möchte meinen Aufenthalt um eine Nacht verlängern.', 'Konaklamamı bir gece uzatmak istiyorum.'],
        ['Gibt es einen Shuttleservice zum Flughafen?', 'Havalimanına servis var mı?']
      ]
    }
  },
  airport: {
    'Biniş & uçakta': {
      A2: [
        ['Wo ist die Passkontrolle?', 'Pasaport kontrolü nerede?'],
        ['Hat das Boarding für den Flug nach Paris begonnen?', 'Paris uçuşu binişe başladı mı?'],
        ['Könnte ich bitte ein Glas Wasser haben?', 'Bir bardak su alabilir miyim, lütfen?']
      ],
      B1: [
        ['Ich bin für zwei Wochen im Urlaub hier.', 'İki haftalığına tatil için buradayım.'],
        ['Ich wohne in einem Hotel im Stadtzentrum.', 'Şehir merkezindeki bir otelde kalacağım.']
      ]
    }
  },
  restaurant: {
    'Ekstra istekler': {
      A2: [
        ['Könnten wir am Fenster sitzen?', 'Pencere kenarına oturabilir miyiz?'],
        ['Kann ich das ohne Zwiebeln haben?', 'Bunu soğansız alabilir miyim?'],
        ['Könnte ich das Rezept haben? Es ist köstlich!', 'Tarifini alabilir miyim? Çok lezzetli!']
      ],
      B1: [
        ['Alles war ausgezeichnet, vielen Dank.', 'Her şey mükemmeldi, teşekkürler.'],
        ['Könnten wir die Rechnung teilen, bitte?', 'Hesabı bölüşebilir miyiz, lütfen?']
      ]
    }
  },
  cafe: {
    'Kafede dahası': {
      A1: [
        ['Ist dieser Platz frei?', 'Bu koltuk boş mu?'],
        ['Kann ich auch ein Glas Wasser haben?', 'Bir de bir bardak su alabilir miyim?']
      ],
      A2: [
        ['Haben Sie heute Kuchen?', 'Bugün kekiniz var mı?'],
        ['Könnte ich das WLAN-Passwort bekommen?', 'Wi-Fi şifresini alabilir miyim?']
      ]
    }
  },
  hospital: {
    'Klinikte': {
      A2: [
        ['Brauche ich dafür ein Rezept?', 'Bunun için reçeteye ihtiyacım var mı?'],
        ['Wie lange dauern die Ergebnisse?', 'Sonuçlar ne kadar sürer?'],
        ['Sollte ich mich ein paar Tage ausruhen?', 'Birkaç gün dinlenmeli miyim?']
      ],
      B1: [
        ['Gibt es etwas, das ich nicht essen sollte?', 'Yememem gereken bir şey var mı?']
      ]
    }
  },
  pharmacy: {
    'Eczanede dahası': {
      A1: [
        ['Haben Sie Schmerzmittel?', 'Ağrı kesiciniz var mı?'],
        ['Ich brauche ein paar Pflaster, bitte.', 'Biraz yara bandı gerekiyor, lütfen.']
      ],
      A2: [
        ['Kann ich das mit anderen Medikamenten nehmen?', 'Bunu başka ilaçla alabilir miyim?'],
        ['Gibt es eine Variante ohne Zucker?', 'Şekersiz bir türü var mı?']
      ]
    }
  },
  supermarket: {
    'Kasada': {
      A1: [
        ['Haben Sie eine Tüte?', 'Poşetiniz var mı?'],
        ['Kann ich einen Kassenbon bekommen?', 'Fiş alabilir miyim?']
      ],
      A2: [
        ['Ist das heute im Angebot?', 'Bu bugün indirimde mi?'],
        ['Wo finde ich die Tiefkühlkost?', 'Dondurulmuş gıdaları nerede bulabilirim?'],
        ['Haben Sie eine Kundenkarte?', 'Sadakat kartınız var mı?']
      ]
    }
  },
  clothing: {
    'Daha fazla alışveriş': {
      A2: [
        ['Haben Sie diese Schuhe in Größe 42?', 'Bu ayakkabıların 42 numarası var mı?'],
        ['Ist das reduziert?', 'Bu indirimde mi?'],
        ['Kann ich bar zahlen?', 'Nakit ödeyebilir miyim?']
      ],
      B1: [
        ['Erstatten Sie auch ohne Kassenbon?', 'Fişsiz para iadesi yapıyor musunuz?']
      ]
    }
  },
  train: {
    'Peronda': {
      A1: [
        ['Ist das der Zug nach London?', 'Bu Londra treni mi?'],
        ['Entschuldigung, ist dieser Platz frei?', 'Pardon, bu koltuk boş mu?']
      ],
      A2: [
        ['Muss ich umsteigen?', 'Aktarma yapmam gerekiyor mu?'],
        ['Wie lange dauert die Fahrt?', 'Yolculuk ne kadar sürüyor?']
      ]
    }
  },
  taxi: {
    'Yolda': {
      A2: [
        ['Könnten Sie bitte etwas langsamer fahren?', 'Biraz yavaşlar mısınız, lütfen?'],
        ['Ist es weit von hier?', 'Buraya uzak mı?'],
        ['Könnten Sie ein paar Minuten warten?', 'Birkaç dakika bekler misiniz?']
      ]
    }
  },
  bank: {
    'Bankada dahası': {
      A2: [
        ['Ich möchte etwas Geld abheben.', 'Biraz para çekmek istiyorum.'],
        ['Wo ist der nächste Geldautomat?', 'En yakın bankamatik nerede?']
      ],
      B1: [
        ['Wie lange dauert es, bis die neue Karte ankommt?', 'Yeni kart ne zaman gelir?'],
        ['Könnten Sie sie an meine Adresse schicken?', 'Adresime gönderebilir misiniz?']
      ]
    }
  },
  police: {
    'Daha fazla ayrıntı': {
      B1: [
        ['Kann ich Sie per E-Mail erreichen?', 'Sizinle e-posta ile iletişim kurabilir miyim?'],
        ['Es ist ein schwarzes Handy in einer blauen Hülle.', 'Mavi kılıfta siyah bir telefon.'],
        ['Ich hatte es zuletzt im Bus Nummer 12.', 'En son 12 numaralı otobüste elimdeydi.']
      ]
    }
  },
  street: {
    'Daha fazla yol tarifi': {
      A2: [
        ['Biegen Sie an der Ampel links ab.', 'Trafik ışıklarında sola dön.'],
        ['Gehen Sie etwa fünf Minuten geradeaus.', 'Yaklaşık beş dakika düz git.'],
        ['Es ist neben der Apotheke.', 'Eczanenin yanında.'],
        ['Bin ich auf dem richtigen Weg?', 'Doğru yolda mıyım?']
      ]
    },
    'Günlük temel cümleler': {
      A1: [
        ['Entschuldigung, können Sie mir helfen?', 'Pardon, yardım edebilir misiniz?'],
        ['Es tut mir leid, ich verstehe nicht.', 'Üzgünüm, anlamıyorum.'],
        ['Könnten Sie das bitte noch einmal sagen?', 'Bunu tekrar söyler misiniz, lütfen?'],
        ['Könnten Sie bitte langsamer sprechen?', 'Biraz daha yavaş konuşur musunuz, lütfen?'],
        ['Wie sagt man das auf Deutsch?', 'Bu Almanca nasıl söylenir?'],
        ['Vielen Dank für Ihre Hilfe.', 'Yardımınız için çok teşekkürler.']
      ]
    }
  },
  workplace: {
    'Günlük ofis': {
      A2: [
        ['Könntest du mir bei dieser Aufgabe helfen?', 'Bu işte bana yardım eder misin?'],
        ['Ich schicke dir den Bericht per E-Mail.', 'Raporu sana e-posta ile göndereceğim.'],
        ['Können wir für morgen ein Meeting ansetzen?', 'Yarın için bir toplantı ayarlayabilir miyiz?']
      ],
      B1: [
        ['Entschuldigung, ich schicke es sofort.', 'Özür dilerim, hemen gönderiyorum.']
      ]
    }
  },
  home: {
    'Evin içinde': {
      A1: [
        ['Kannst du mir bitte das Salz geben?', 'Tuzu uzatır mısın, lütfen?'],
        ['Ich gehe zum Laden. Brauchst du etwas?', 'Markete gidiyorum. Bir şeye ihtiyacın var mı?'],
        ['Das Essen ist fertig!', 'Yemek hazır!']
      ],
      A2: [
        ['Könntest du die Musik etwas leiser machen?', 'Müziği biraz kısar mısın?'],
        ['Ich spüle heute Abend das Geschirr.', 'Bulaşıkları bu gece ben yıkarım.']
      ]
    }
  }
};

// Deep-merge two RAW objects (place → topic → level arrays never collide here
// because RAW_EXTRA uses distinct topic names).
function mergeRaw(a, b) {
  const out = JSON.parse(JSON.stringify(a));
  for (const [place, topics] of Object.entries(b)) {
    out[place] = { ...(out[place] || {}), ...topics };
  }
  return out;
}

// Flatten RAW into a single array with stable ids.
function build(raw) {
  const out = [];
  for (const [locationId, topics] of Object.entries(raw)) {
    for (const [topic, byLevel] of Object.entries(topics)) {
      for (const [level, pairs] of Object.entries(byLevel)) {
        pairs.forEach(([en, tr], i) => {
          out.push({
            id: `${locationId}-${topic.replace(/[^a-z]/gi, '').slice(0, 8)}-${level}-${i}`.toLowerCase(),
            en, tr, level, locationId, topic
          });
        });
      }
    }
  }
  return out;
}

export const PHRASEBOOK = build(mergeRaw(RAW, RAW_EXTRA));

// Group metadata for the Quick Practice screen (icon/label per place), reusing
// the Story environments where possible.
export const PHRASE_PLACES = {
  hotel:       { icon: '🏨', label: 'Hotel',              labelTr: 'Otel' },
  airport:     { icon: '✈️', label: 'Flughafen',          labelTr: 'Havalimanı' },
  restaurant:  { icon: '🍽️', label: 'Restaurant',         labelTr: 'Restoran' },
  cafe:        { icon: '☕', label: 'Café',                labelTr: 'Kafe' },
  hospital:    { icon: '🏥', label: 'Krankenhaus',        labelTr: 'Hastane' },
  pharmacy:    { icon: '💊', label: 'Apotheke',           labelTr: 'Eczane' },
  supermarket: { icon: '🛒', label: 'Supermarkt',         labelTr: 'Market' },
  clothing:    { icon: '👕', label: 'Bekleidungsgeschäft', labelTr: 'Giyim' },
  train:       { icon: '🚆', label: 'Bahnhof',            labelTr: 'Tren Garı' },
  taxi:        { icon: '🚕', label: 'Taxi',               labelTr: 'Taksi' },
  bank:        { icon: '🏦', label: 'Bank',               labelTr: 'Banka' },
  police:      { icon: '🚓', label: 'Polizei',            labelTr: 'Karakol' },
  street:      { icon: '🚶', label: 'Unterwegs',          labelTr: 'Dışarıda' },
  workplace:   { icon: '💼', label: 'Arbeitsplatz',       labelTr: 'İş Yeri' },
  home:        { icon: '🏠', label: 'Zuhause',            labelTr: 'Ev' }
};

export function phrasesForPlace(locationId) {
  return PHRASEBOOK.filter(p => p.locationId === locationId);
}

export const PHRASEBOOK_COUNT = PHRASEBOOK.length;
