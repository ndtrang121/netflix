export default function detectDevice() {
    let device = 'desktop'
    let itemsToShow = 6
    let marginRight = 8
    let padding = 60
    const width = window.innerWidth

    if (width >= 1400) {
        device = 'desktop'
        itemsToShow = 6
        marginRight = 8
        padding = 60
    } else if (width < 1400 && width >= 1100) {
        device = 'laptop'
        itemsToShow = 5
        marginRight = 6
        padding = 50
    } else if (width < 1100 && width >= 800) {
        device = 'smallScreen'
        itemsToShow = 4
        marginRight = 4
        padding = 40
    } else if (width < 800 && width >= 500) {
        device = 'tablet'
        itemsToShow = 3
        marginRight = 4
        padding = 30
    } else if (width < 500) {
        device = 'mobile'
        itemsToShow = 2
        marginRight = 4
        padding = 20
    }

    return { device, itemsToShow, marginRight, padding }
}
