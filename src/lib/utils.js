const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
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

export async function creerEvenement(data) {

    const res = await fetch('http://127.0.0.1:5000/api/evenement', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(res);

    if (res.ok) {
        return await res.json();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}

export async function GET(route, url = 'http://127.0.0.1:5000/api/') {
    const res = await fetch(url + route || '')

    if (res.ok) {
        return await res.json();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}

export async function POST(route, donnes, url = 'http://127.0.0.1:5000/api/') {
    const res = await fetch(url + route || '', {
        method: 'POST',
        body: JSON.stringify(donnes),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    if (res.ok) {
        return await res.json();
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}
