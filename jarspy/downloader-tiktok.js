import fetch from 'node-fetch';

const jarspy = async (m, { conn, text, args, command, usedPrefix }) => {
  let input = `[!] *Input Salah* ❌\n\nContoh: ${usedPrefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;

  if (!text) return m.reply(input);

  if (!(text.includes("http://") || text.includes("https://")))
    return m.reply(`URL tidak valid, coba masukkan URL yang bener. Pastikan ada http:// atau https:// 🚫`);

  if (!text.includes("tiktok.com")) return m.reply(`URL TikTok tidak valid. ❌`);

  try {
    const anu = await fetch(`https://rest.cifumo.biz.id/api/downloader/tiktok?url=${text}`);
    const req = await anu.json();
    const {
      type,
      region,
      title,
      author,
      music_info,
      play,
      play_count,
      digg_count,
      comment_count,
      share_count,
      download_count,
      create_time,
      music,
      images,
    } = req.data;
    const { unique_id, nickname, avatar } = author;
    const { title: musicTitle, author: musicAuthor, play: musicPlay } = music_info;

    let tek = `*[ TikTok Downloader ]*\n\n`;
    tek += `> *\`Info\`*\n`;
    tek += `- \`Deskripsi:\` ${title}\n`;
    tek += `- \`Region:\` ${region}\n`;
    tek += `- \`Jumlah Putar:\` ${play_count} ▶️\n`;
    tek += `- \`Likes:\` ${digg_count} ❤️\n`;
    tek += `- \`Komentar:\` ${comment_count} 💬\n`;
    tek += `- \`Shares:\` ${share_count} 🔄\n`;
    tek += `- \`Jumlah Download:\` ${download_count} ⬇️\n`;
    tek += `- \`Waktu Dibuat:\` ${new Date(create_time * 1000).toLocaleString()}\n\n`;
    tek += `> *\`Info Penulis\`*\n`;
    tek += `- \`Nama Panggilan:\` ${nickname}\n`;
    tek += `- \`ID:\` ${unique_id}\n`;
    tek += `- \`Avatar:\` ${avatar}\n\n`;
    tek += `> *\`Info Musik\`*\n`;
    tek += `- \`Judul Musik:\` ${musicTitle}\n`;
    tek += `- \`Penulis Musik:\` ${musicAuthor}\n`;

    if (images && images.length > 0) {
      await m.reply("Detected TikTok Slide URL 📸\nFoto akan dikirim ke chat pribadi.");
      await m.reply(tek);

      let cap = `乂 *TIKTOK SLIDE*\n\n`;
      let no = 1;
      for (let img of images) {
        await conn.sendFile(m.sender, img, "", `${cap}*[${no++}]*`, null);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      await conn.sendFile(m.chat, 'https://tikwm.com' + music, "music.mp3", "", m, false, {
        mimetype: "audio/mpeg",
      });
    } else {
      await m.reply("Detected TikTok Video URL 🎥");
      await conn.sendFile(m.chat, 'https://tikwm.com' + play, "video.mp4", tek, m);
      await conn.sendFile(m.chat, 'https://tikwm.com' + music, "music.mp3", "", m, false, {
        mimetype: "audio/mpeg",
      });
    }
  } catch (e) {
    await m.reply(`Oops! Ada yang salah. Coba lagi nanti. 😅\nError: ${e.message}`);
  }
};

jarspy.help = ["tiktok <url>"];
jarspy.tags = ["downloader"];
jarspy.command = /^(t(ik)?t(ok)?|t(ik)?t(ok)?dl)$/i;

jarspy.register = true;
jarspy.limit = true;
jarspy.error = 0;

export default jarspy;
