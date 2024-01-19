const staticDevPollUrbain = "dev_poll_urbain_v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/images/ledome_vegetal.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevPollUrbain).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})