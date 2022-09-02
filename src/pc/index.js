/*
  ZaDark – Zalo Dark Mode
  Made by NCDAi Studio
*/

const prompt = require('prompt-sync')()
const chalk = require('chalk')

const zaDarkPC = require('./zadark-pc')
const { log, logError, open } = require('./utils')
const { PLATFORM, ZADARK_VERSION } = require('./constants')

const renderHeader = () => {
  log('')
  log(chalk.blueBright.bold('ZaDark – Zalo Dark Mode'))
  log(chalk.blueBright('Version :', `${PLATFORM === 'darwin' ? 'macOS' : 'Windows'}-${ZADARK_VERSION}`))
  log(chalk.blueBright('Website :', chalk.underline('https://zadark.ncdaistudio.com')))
  log('')
}

const handleInstall = async (zaloResDirList, isSyncWithSystem = false) => {
  log(chalk.magentaBright.bold('[CAI DAT DARK THEME]'))

  for (const zaloResDir of zaloResDirList) {
    log('')
    log(chalk('>> Dang cai dat', chalk.bold(zaloResDir)))
    await zaDarkPC.installDarkTheme(zaloResDir, isSyncWithSystem)
  }

  log('')
  log(chalk.green('>> Cai dat thanh cong. Vui long khoi dong lai Zalo.'))
}

(async () => {
  try {
    const defaultZaloPath = PLATFORM === 'darwin'
      ? '/Applications/Zalo.app' // ! Can't be changed
      : process.env.USERPROFILE + '/AppData/Local/Programs/Zalo' // ! Can't be changed

    let zaloResDirList = zaDarkPC.getZaloResDirList(defaultZaloPath)
    if (!zaloResDirList.length) {
      log('')
      log(chalk.redBright(`Khong tim thay Zalo tai duong dan mac dinh (${defaultZaloPath}).`))
      log('')

      log(chalk.magentaBright.bold('[TUY CHINH DUONG DAN ZALO]'))
      log('')

      const examplePath = PLATFORM === 'darwin' ? '/ThuMucDaCaiZalo/Zalo.app' : 'D:\\ThuMucDaCaiZalo\\Zalo'
      const customZaloPath = prompt(chalk.yellowBright(`> Nhap duong dan Zalo cua ban (VD: ${examplePath}) : `))

      zaloResDirList = zaDarkPC.getZaloResDirList(customZaloPath)
      if (!zaloResDirList.length) {
        throw new Error('Khong tim thay Zalo. Vui long tai va cai dat Zalo tai "https://zalo.me/pc".')
      }
    }

    console.clear()
    renderHeader()

    log(chalk.magentaBright.bold('[LUU Y QUAN TRONG]'))
    log('')
    log(chalk.redBright('1. DE DAM BAO AN TOAN, truoc khi cai dat hay chac chan ban da tai ZaDark tu'))
    log('  ', chalk.underline.redBright('https://sourceforge.net/projects/zadark/files/ZaDarkPC/'))
    log('2. Vui long thoat Zalo truoc khi cai dat, go cai dat ZaDark.')
    log('3. Vui long cai dat lai ZaDark sau khi cap nhat Zalo.')
    log('')

    prompt(chalk.yellowBright('> Nhan', chalk.bold('[enter]'), 'de bat dau ...'))

    console.clear()
    renderHeader()

    log(chalk.magentaBright.bold('[CHUC NANG]'))
    log('')
    log('1. Cai dat Dark default')
    log('2. Cai dat Dark auto')
    log('3. Khoi phuc Zalo goc')
    log('')

    log('4. Lien he')
    log('5. Thoat')
    log('')

    const featureIndex = prompt(chalk.yellowBright('> Nhap STT chuc nang', chalk.bold('[1-5]'), 'va nhan', chalk.bold('[enter]'), ': '))

    console.clear()
    renderHeader()

    switch (featureIndex) {
      case '1': {
        await handleInstall(zaloResDirList)
        break
      }

      case '2': {
        log(chalk.magentaBright.bold('[CAI DAT DARK AUTO]'))
        log(chalk.magentaBright('Tu dong thay doi giao dien Zalo theo He dieu hanh.'))
        log('')

        await handleInstall(
          zaloResDirList,
          true
        )

        break
      }

      case '3': {
        log(chalk.magentaBright.bold('[KHOI PHUC ZALO GOC]'))

        for (const zaloResDir of zaloResDirList) {
          log('')
          log(chalk('>> Dang go cai dat', chalk.bold(zaloResDir)))
          await zaDarkPC.uninstallDarkTheme(zaloResDir)
        }

        log('')
        log(chalk.green('>> Khoi phuc Zalo goc thanh cong. Vui long khoi dong lai Zalo.'))

        break
      }

      case '4': {
        log(chalk.magentaBright.bold('[LIEN HE]'))

        const contactUrl = 'https://zadark.ncdaistudio.com/contact'
        log('>> Truy cap', chalk.underline(contactUrl))
        open(contactUrl)

        break
      }

      default: {
        log(chalk.magentaBright.bold('[THOAT]'))
        break
      }
    }
  } catch (error) {
    log('')
    logError('Xay ra loi :', error.message)
  } finally {
    log('')
    log('Cam on ban da su dung ZaDark, chuc ban lam viec hieu qua!')
    log('Goodbye.')
    log('')
    prompt(chalk.yellowBright('> Nhan', chalk.bold('[enter]'), 'de thoat chuong trinh ...'))
  }
})()
