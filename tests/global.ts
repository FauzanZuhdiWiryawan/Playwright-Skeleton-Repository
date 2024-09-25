export const BASE_URL = `` //isikan sesuai dengan url yang akan dilakukan test 
export const user_a = `userA@mail.com` //isikan sesuai dengan username akun yang akan digunakan
export const user_b = `userB@mail.com` //isikan sesuai dengan username akun yang akan digunakan
export const user_c = `userC@mail.com` //isikan sesuai dengan username akun yang akan digunakan
export const password = `123` //isikan sesuai dengan password akun yang akan digunakan

//functions
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

export function getHexColor() {
    // Generate a random integer between 0 and 16777215 (inclusive)
    const randomInt = Math.floor(Math.random() * 16777216)
    // Convert the integer to a hex string and pad it with leading zeros if necessary
    const hexColor = randomInt.toString(16).padStart(6, '0')
    // Return the hex color code 
    return `${hexColor}`
}

export function getFormattedDate(day) {
    const today = new Date();
    const year = today.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const month = monthNames[today.getMonth()];

    // Create a new date object with the specific day
    const specificDate = new Date(year, today.getMonth(), day);
    const dayName = dayNames[specificDate.getDay()];

    const daySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${dayName}, ${month} ${day}${daySuffix(day)},`;
}