import dappeteer from '@chainsafe/dappeteer';
import delay from 'delay';

async function main() {
    console.log("////////////////////////////////////////")
    console.log("//////////// dAppeteer ACE /////////////")
    console.log("/////// Auto Login with Metamask ///////")
    console.log("////////////////////////////////////////")
    console.log("\n")
    const { metaMask, browser } = await dappeteer.bootstrap({
        puppeteerOptions: [

        ],
        headless:false,
        devtools:false,
        seed: "autumn deal viable acid mechanic disorder aerobic chimney garage receive wine random", //ini metamask ngebaca phrase kalian guys (phrasenya gw nyoba dari generator :v)
        password: "Anakanjing123#", //ini password buat metamasknya
    });

    // create a new page and visit your dapp
    const dappPage = await browser.newPage(); //ini buat buka tab baru 
    try {
        console.log("membuka link ace.fusionist.io")
        await dappPage.goto('https://ace.fusionist.io/account/endurance', {waitUntil: "networkidle0"});
        const connectwalletButton = await dappPage.$('#__next > div > div > div:nth-child(2) > div > div > div > div > div > div'); //ini selector tombol connectwallet
        await connectwalletButton.click();
        await delay(2000)
        const metamaskwallet = await dappPage.$("body > div > div > div > button:nth-child(1)") //setelah wallet connect di klik muncul metamask, walletconnect nah ini selector milih metamasknya
        await metamaskwallet.click();
        await delay(2000) //mbuhlah cuman delay biar ga kecepetan :v
        console.log("mencoba connect ace.fusionist.io dengan metamask")
        await metaMask.approve() //ini buat approve akses metamask ke dapp
        console.log("aproving...")
        await metaMask.sign() //ini buat sign akses metamask ke dapp
        console.log("sign aproved")
        await dappPage.bringToFront(); //ini buat balik ke tab ACE nya, kan sebelumnya di tab metamask tuh browsernya :v
        console.log("menuju ace.fusionist.io endurance")
        await dappPage.goto('https://ace.fusionist.io/account/endurance', {waitUntil: "networkidle0"}); //buat ke link endurancenya (link buat claim)
        if(await dappPage.url().indexOf("login") > -1) { //disini pake if else buat ngecek kalo ada link login, berarti ACEnya belum connect ke metamask
            const connectwalletButton2 = await dappPage.$('#__next > div > div > div:nth-child(2) > div > div > div > div > div > div'); //jadi tak connectin lagi :v
            await connectwalletButton2.click();
            await delay(2000)
            console.log("mencoba connect ace.fusionist.io lagi dengan metamask")
            const metamaskwallet2 = await dappPage.$("body > div > div > div > button:nth-child(1)") //pilih yg metamask lagi
            await metamaskwallet2.click();
            await metaMask.sign() //sign akses metamask ke dapp lagi
            await delay(3000)
            await dappPage.bringToFront(); //sama kek yang tadi :v
            await dappPage.goto('https://ace.fusionist.io/account/endurance', {waitUntil: "networkidle0"});
            if (await dappPage.url().indexOf("endurance") > -1) {
                console.log("sukses login ke endurance ace.fusionist.io") //ini log kalau sukses login pake metamask
            } else {
                console.log("sukses login, tapi akunmu ga terdaftar cuy :v") //ini log kalau error, biasanya karena ga kedaftar di endurance
            }
        } else if (await dappPage.url().indexOf("endurance") > -1) { //ini if kedua kalau yg diatas tadi gagal, jadi kalau langsung konek ke endurance, langsung kek gini
            console.log("sukses login ke endurance ace.fusionist.io")
        } else {
            console.log("gagal login tidak diketahui penyebabnya") //ini log kalau semua if diatas gagal
        }
    } catch (err) {
        console.log(err) //ini log kalau ada yg error, kalau gw biasanya pas ngelooping ini gw continue in a loop, jadi kalo error dia skip aja
    }
}

main();
