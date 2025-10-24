const obs = document.querySelectorAll('.obs')

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('view')
            observer.unobserve(entry.target)
        }
    })
},{
    threshold: 0.1,
}
)

obs.forEach(el => {
    observer.observe(el)
})