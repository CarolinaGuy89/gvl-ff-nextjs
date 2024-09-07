//Calculate the current week
export default function calculateDefaultWeek() {

    const currentDate = new Date();
    const startOfWeek1 = new Date('2024-09-05'); // Thursday of NFL Week one
    const millisecondsInAWeek = 604800000;
    var weeksSinceStart = Math.ceil((currentDate - startOfWeek1) / millisecondsInAWeek);

    if (weeksSinceStart < 0) {
      weeksSinceStart = 0;
    }
    
    // Ensure the week number is between 0 and 17 (or your season's max week)
    // 0 = Preseason
    //return Math.min(Math.max(weeksSinceStart + 1, 1), 17);
    return Math.min(Math.max(weeksSinceStart, 0), 18);
}