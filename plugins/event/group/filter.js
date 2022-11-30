exports.run = {
   async: async (m, {
      client,
      body,
      users,
      groupSet,
      setting,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.filter && !isAdmin && isBotAdmin && !m.fromMe) {
            let toxic = setting.toxic
            if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
               groupSet.member[m.sender].warning += 1
               let warning = groupSet.member[m.sender].warning
               if (warning > 4) return client.reply(m.chat, Func.texted('bold', `🚩 TOXIC : [ 5 / 5 ], good bye manusia kotor ~~`), m).then(() => {
                  client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
                     groupSet.member[m.sender].warning = 0
                  })
               })
               return client.reply(m.chat, `乂  *TERDETEKSI TOXIC* \n\nToxic Kamu Sudah Mencapai : [ ${warning} / 5 ]\n\Jika Kamu Toxic Sampai 5× Kamu Akan Dikick`, m)
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true
}
