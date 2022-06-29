function factoryTimeZone() {
    const currentTime = new Date()

    let factoryTime = new Date(currentTime.toLocaleString('en-US', {timeZone: 'Indian/Maldives'}))


    if (8 <= factoryTime.getHours() && factoryTime.getHours() < 20) {
        factoryTime.setHours(8)
        factoryTime.setMinutes(0)
        factoryTime.setSeconds(0)
    } else if (0 <= factoryTime.getHours() && factoryTime.getHours() < 8) {
        factoryTime.setHours(factoryTime.getHours() - 12)
        factoryTime.setHours(20)
        factoryTime.setMinutes(0)
        factoryTime.setSeconds(0)
    } else {
        factoryTime.setHours(20)
        factoryTime.setMinutes(0)
        factoryTime.setSeconds(0)
    }

    return factoryTime
}

export default factoryTimeZone;