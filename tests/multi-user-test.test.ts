import { test } from '@playwright/test'
import path from 'path'
import { BASE_URL, user_a, user_b, user_c, password} from './global'

// Setting durasi maksimal eksekusi untuk setiap test case yang akan dijalankan
test.setTimeout(300000) //5 Menit

const userMap = {
    'TC001-Test Case A': user_a,
    'TC002-Test Case B': user_b,
    'TC003-Test Case C': user_c,
    'TC004-Test Case D': user_a,
    'TC005-Test Case E': user_c
  }

test.describe('Functional Test Page A', () => {
    
    //Pre-Condition :
    test.beforeEach(async({page}, testInfo) => {
      const testName = testInfo.title
      const username = userMap[testName]
      
      //script login dan langkah menuju page
      await page.goto(BASE_URL);
      await page.locator('').fill(username)
      await page.locator('').fill(password)
      await page.getByRole('button', { name: 'Login' }).click()
      await page.waitForTimeout(5000)
      //isikan langkah langkah menuju page atau fitur yang akan dilakukan test untuk akun tersebut.
      console.log('Berhasil masuk ke dalam Page A')
    });
    
    //Post-Condition : 
    //Berupa Logout atau Menutup page/browser
    test.afterEach(async ({ page }) => {
    //script logout atau langkah menutup browser
    await page.close()
     })

    test('TC001-Test Case A', async ({ page }) => {        
        //Test Case yang akan dieksekusi oleh user A

        //Contoh code upload files dengan kondisi file tersebut telah berada di dalam repository.
        await page.locator(``).setInputFiles(path.resolve(__dirname,`../../lokasi file dalam repository`)) 
                       
    })
    test('TC002-Test Case B', async ({ page }) => {        
        //Test Case yang akan dieksekusi oleh user B

        //Contoh eksekusi test dinamis untuk action untuk data yang berada dalam tabel
        let index = 1
        let trueRow = false
        let currentPage = 1
        const maxRowOnPage = 10
        const entries = await page.locator(`//locator footer yang menunjukkan jumlah data`).innerText()
        const regex = /of (\d+) entries/
        const valueOnList = entries.match(regex)
        if (valueOnList){
            const maxRow = parseInt(valueOnList[1], 10)
            const maxPage = Math.ceil(maxRow/maxRowOnPage)
            let attempt = 1
            while (!trueRow && attempt < maxRow){
                try {
                    const rowStatus = await page.locator(`//Locator kolom tertentu yang akan dijadikan patokan pencarian data yang sesuai`).innerText()
                    const rowName = await page.locator(`//Locator kolom tertentu yang akan dijadikan patokan pencarian data yang sesuai`).innerText()
                    
                    if(rowStatus.includes(`Active`) && rowName.includes(`Document A`)){
                        trueRow = true
                        console.log(`Data yang akan digunakan merupakan data pada baris ke ${index} pada halaman ${currentPage}`)
                        await page.waitForTimeout(5000)
                        
                        //Eksekusi Test Case

                        break
                    } else {
                        console.log(`status pada row ${index} belum sesuai, mencoba ke baris selanjutnya...`);
                        await page.waitForTimeout(2000)
                        index++
                        attempt++
                        
                        if(attempt>maxRow){ //pengecekan apakah data sudah sampai ke data terakhir
                            console.log('data tidak ditemukan.');
                                break
                        }
                        
                        if(index > maxRowOnPage){
                            if (currentPage < maxPage) {
                                currentPage++
                                index = 1 // Reset ke row 1 untuk halaman berikutnya
                                await page.waitForTimeout(2000)
                                console.log(`Berpindah ke halaman ${currentPage}`);
                                await page.waitForTimeout(2000)
                                await page.getByLabel(`//locator pagination`).click()
                                await page.waitForTimeout(5000)// Tunggu halaman berikutnya dimuat
                              } else {
                                console.log('Semua halaman telah dicek dan data tidak ditemukan.');
                                break // Jika semua halaman sudah dicek, keluar dari loop
                              }
                        }
                    }
                } catch (error){
                    console.log('Error:', error);
                    index++
                }
            }
        }
    })
    
    test('TC003-Test Case C', async ({ page }) => {        
        //Test Case yang akan dieksekusi oleh user C
    })
    test('TC004-Test Case D', async ({ page }) => {        
        //Test Case yang akan dieksekusi oleh user A
    })
    test('TC005-Test Case E', async ({ page }) => {        
        //Test Case yang akan dieksekusi oleh user C
    })
})