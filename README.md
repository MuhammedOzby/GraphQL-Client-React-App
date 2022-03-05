# GraphQL client

Graphql Client içi verilen tüm ödevler **GraphQL-Client-React-App** altında toplanacaktır. verilen diğer ödevler commitler üzerinden beyan edilecektir.

---

## Ödev 4

Diğer ödevlerde hazırlamış olduğunuz backend'i kullanarak [Apollo Client](https://www.apollographql.com/docs/react/) ile React uygulaması geliştirmeniz gerekiyor.

### Gereksinimler (Ödev 4)

- [create-react-app](https://create-react-app.dev/) ile bir React uygulaması ayağa kaldırınız.
- [Apollo Client](https://www.apollographql.com/docs/react/) kurulumunu gerçekleştiriniz.
- Veri setinde bulunan Etkinlikleri anasayfada listeleyiniz.
- Burada etkinlik adı, açıklaması ve zamanı listeleyiniz.
- Etkinlik detayına gidildiğinde etkinlik sahibi, konum ve katılımcılar da görüntülenmelidir.

---

### İşlemler

- React router dom V6 kullanılmıştır. Bu yüzden bir kaç değişiklik mevcuttur.
  - [Yeni sayfa yapısı](https://reactrouter.com/docs/en/v6/getting-started/overview)
  - useResolvedPath,  useMatch,  useNavigate, fonksiyonları ile yeniden geliştirildi.
  - Etkinlikler altında katılımcıları gösteren açılabilir bir panele sahip.
- React tsconfig üzerinden **path** kullanımını desteklemediği için yapısal olarak değişiklikte bulunulmuştur.
- **react-scripts** ile gelen yeniliklere başvurulmuştur :)

---

## Ödev 5

Bir önceki ödevde listelemeyi statik olarak yapmıştınız. Yani, herhangi etkinlik eklendiği anda gerçek zamanlı olarak bu veriyi görüntüleyemiyorduk. Şimdi yapmanız geren bu verileri gerçek zamanlı olarak listelemek.

### Gereksinimler (Ödev 5)

- Etkinlik listesini gerçek zamanlı çalışacak şekilde görüntüleyiniz.
- Bir etkinliğe yeni bir katılımcı eklendiğinde, etkinlik detay ekranında bunu - gerçek zamanlı olarak görüntüleyiniz.

---

### İşlemler (Ödev 5)

- Tüm işlemler **Home** içerisinde tamamlanmıştır.
- Badge ayrık olarak değil listenin üzerine eklenmiştir.
- İlk yüklenmedeki sayaç sorununa karşın data üzerine useEffect yazılmıştır.
- Sayaç yönetimi state yapısının içerisinde yapıldı.
- Query dosyası ayrıldı ve **Fragment** yöntemi kullanıldı.
- Environments genişletildi.
