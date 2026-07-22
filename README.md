# SpeakScenes Almanca — Kaydır, Konuş, Büyü

SpeakScenes'in **Shorts odaklı Almanca** klonu. TikTok tarzı dikey akışta gerçek,
seviyelendirilmiş (A0→C2) Almanca cümleler: her yukarı kaydırma karakterini
büyütür (bebek → kendinden emin yetişkin) ve cümleler tam o hızda zorlaşır.
Her kart dinlenebilir (🔊 / 🐢 yavaş), **mikrofonla sesli söylenip** gerçek
konuşma tanımayla puanlanır (de-DE), Türkçe çevirisi bir dokunuşla açılır.

- **Binlerce üretilmiş, dil bilgisi açısından doğrulanmış cümle** — küçük, elle
  seçilmiş kelime bankaları (artikel/akuzatif formlarıyla) × seviyeye göre
  etiketlenmiş kalıplar; deterministik üretim, her açılışta aynı sıra.
- **Konuşma puanlama** aynı dürüst hizalama motorudur (eksik/yanlış/fazla
  kelime gerçek ASR çıktısından; olumsuzluk/sayı hataları her zaman reddedilir).
  Aksansız yazım da adil karşılaştırılır (ü→u, ß→ss her iki tarafta).
- **Mikrofon yoksa** net şekilde belirtilen yazılı moda düşer.

Orijinal İngilizce uygulamanın (SpeakScenes) diyalog/hikaye modları İngilizce
içeriğe özel olduğundan bu klonda kayıtlı değildir; motor dosyaları depoda
durur ve Shorts deneyimi bunların üzerinde çalışır.

## Çalıştırma

Konuşma tanıma güvenli bağlam ister (localhost veya https):

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1 -LocalOnly
# http://localhost:8123
```

Testler: `http://localhost:8123/tests/`
