// if you made any changes change stopwatch-v1
// One note: the activation handler deletes every other cache on this site’s origin. That’s fine if this origin only hosts your stopwatch app; if it hosts other apps, restrict deletion to caches with your app’s prefix.
const pwacache= "stopwatch-v1";
self.addEventListener("install",(event)=>{
event.waitUntil(
    caches.open(pwacache).then((cache)=>{
        return cache.addAll([
            '/',
            '/index.html',
            '/style.css',
            '/script.js',

        ])
    })
)
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== pwacache)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            return response || fetch(event.request)
        })
    )
})

