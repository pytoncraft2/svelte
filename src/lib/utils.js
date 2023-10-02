const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export async function getEvenementSpecifique() {
   const res = await fetch('/donnes.json')

    if (res.ok) {
        return await res.json();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}

export async function getEvenement(urlPartage) {
   const res = await fetch('/donnes2.json')

    if (res.ok) {
        return await res.json();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}