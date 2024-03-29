import simi from 'similarity'; //Matikan jika kamu gk perlu kemiripan commands
import { format } from 'util';
import q from '../../Setting/settings.js';
import d from '../Fake/function.js';

const z = q.sensitive
const bb = (teks) => '```'+teks+'```'

const findAdmin = (arr) => {
	let admins = []
	for (let i of arr) i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
	return admins || []
}
export const commands = async (conn, m) => {
	const sendErr = (err) => conn.sendMessage(q.developer[0]+q.idwa, {text: `Command : /${m.command}\nOleh : ${m.sender}\n\n${bb(format(err))}` })
	try {
		let grup = {}
		grup.meta = (m.isGc ? await conn.groupMetadata(m.chat).catch(e => null) : {}) || {}
		grup.members = (m.isGc ? await grup.meta.participants : []) || []
		grup.admins = (m.isGc ? await findAdmin(grup.members): {}) || {}
		grup.isAdmin = m.isGc ? grup.admins.includes(m.sender) : false
		grup.isBotAdmin = m.isGc ? grup.admins.includes(m.bot) : false
		//import('handle-before.js').then(v => v.before(m, conn, grup)).catch(e=> sendErr(e))
			/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
		if (/(menu|help)$/.test(m.command)) import('./feature/b-menu.js').then(v => v.handle(m, conn)).catch(e=>sendErr(e));
		if (/(creator|owner|developer)$/.test(m.command)) import('./feature/b-creator.js').then(v => v.handle(m, q, conn)).catch(e=>sendErr(e));
		if (/(group|link|groupbot)$/.test(m.command)) import('./feature/b-gcbot.js').then(v => v.handle(m, q, conn)).catch(e=>sendErr(e));
		if (/(script|sc)$/.test(m.command)) import('./feature/b-script.js').then(v => v.handle(m, q, conn, bb)).catch(e=>sendErr(e));
		if (/(hidetag|ht)$/.test(m.command)) import('./feature/g-hidetag.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendErr(e));
		if (/(tagall|tgl)$/.test(m.command)) import('./feature/g-tagall.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendErr(e));
		if (/(setname|setgcname)$/.test(m.command)) import('./feature/g-setname.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendErr(e));
		if (/(setdesk|setdesc|setdeskripsi)$/.test(m.command)) import('./feature/g-setdesc.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendErr(e));
		if (/(setppgc|setppgrup|setppgroup)$/.test(m.command)) import('./feature/g-setppgc.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendErr(e));
	} catch (e) {
		console.log(e);
	}
}