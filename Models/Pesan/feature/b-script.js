export const handle = (m, q, conn, bb) => {
	let men = m.isGc ? m.sender : null
	let teks = `[				Source Code Bot ini				]\n\n`
		teks += `Kunjungi Github ${q.name} :\n`
		teks += `${q.home}\n`
		teks += `Jangan lupa beri bintang & Follow Akun Github Owner ku yah\n`
	let foot = `Report Jika ada Bug Disini : ${q.bug}`
	let buttons = [
		['Oke min', 'hehe']
		]
	conn.sendbut(m.chat, teks, foot, buttons, men)
}