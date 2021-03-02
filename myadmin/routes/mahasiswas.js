var express = require('express');
var router = express.Router();
/* var authentication_mdl = require('../middlewares/authentication'); */
var session_store;
/* GET mahasiswa page. */
router.get('/',/* authentication_mdl.is_login, */ function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM tbmsiswa',function(err,rows)
        {
            if(err)
            var errornya = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('mahasiswa/list',{title:"Mahasiswa",data:rows,session_store:
            req.session});
        });
    //console.log(query.sql);
    });
 });
module.exports = router;
router.post('/add', /* authentication_mdl.is_login, */ function(req, res, next)
{
 req.assert('nama', 'Please fill the nama').notEmpty();
 var errors = req.validationErrors();
 if (!errors) {
 v_nim = req.sanitize('nim').escape().trim();
 v_nama = req.sanitize( 'nama' ).escape().trim();
 v_tmptlhr = req.sanitize('tmptlhr').escape().trim();
 v_tgllhr = req. sanitize('tgllhr').escape().trim();
 v_jk = req.sanitize('jk').escape().trim();
 v_alamat = req.sanitize( 'alamat' ).escape().trim();
 v_jurusan = req.sanitize( 'jurusan' ).escape().trim();
 v_kelas = req.sanitize('kelas').escape().trim();
 v_semester = req.sanitize('semester').escape().trim();
 v_ket = req.sanitize( 'ket' ).escape();
 var mahasiswa = {
 nim: v_nim,
 nama: v_nama,
 tmpt_lahir: v_tmptlhr,
 tgl_lahir: v_tgllhr,
 jenis_kelamin: v_jk,
 alamat: v_alamat, 
 jurusan: v_jurusan,
 kelas: v_kelas,
 semester: v_semester,
 ket : v_ket
 }
 var insert_sql = 'INSERT INTO tbmsiswa SET ?';
 req.getConnection(function(err,connection){
 var query = connection.query(insert_sql, mahasiswa, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Insert : %s ",err );
 req.flash('msg_error', errors_detail);
 res.render('mahasiswa/add-mahasiswa',
 {
 nim: req.param('nim'),
 nama: req.param('nama'),
 tmpt_lahir: req.param('tmptlhr'),
 tgl_lahir: req.param('tgllhr'),
 jenis_kelamin: req.param('jk'),
 alamat: req.param('alamat'),
 jurusan: req.param('jurusan'),
 kelas: req.param('kelas'),
 semester: req.param('semester'),
 ket: req.param('ket'),
 });
 }else{
 req.flash('msg_info', 'Create mahasiswa success');
 res.redirect('/mahasiswa');
 }
 });
 });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error <ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('mahasiswa/add-mahasiswa',
 {
    nim: req.param('nim'),
    nama: req.param('nama'),
    tmpt_lahir: req.param('tmptlhr'),
    tgl_lahir: req.param('tgllhr'),
    jenis_kelamin: req.param('jk'),
    alamat: req.param('alamat'),
    jurusan: req.param('jurusan'),
    kelas: req.param('kelas'),
    semester: req.param('semester'),
    ket: req.param('ket'),
 });
 }
});
router.get('/add', function(req, res, next) {
9
 res.render( 'mahasiswa/add-mahasiswa',
 {
 title: 'Add New mahasiswa',
 nim: '',
 nama: '',
 jurusan: '',
 ket:'',
 alamat:'',
 tmpt_lahir:'',
 tgl_lahir:'',
 jenis_kelamin:'',
 kelas:'',
 semester:''
 });
});
router.get('/edit/(:id)', /* authentication_mdl.is_login,  */function(req,res,next){
 req.getConnection(function(err,connection){
 var query = connection.query('SELECT * FROM tbmsiswa where id='+req.params.id,function(err,rows)
 {
 if(err)
 {
 var errornya = ("Error Selecting : %s ",err );
 req.flash('msg_error', errors_detail);
 res.redirect('/mahasiswa');
 }else
 {
 if(rows.length <=0)
 {
 req.flash('msg_error', "mahasiswa can't be find!");
 res.redirect('/mahasiswa');
 }
 else
 {
 console.log(rows);
 res.render('mahasiswa/edit',{title:"Edit ",data:rows[0]});

 }
 }

 });
 });
 });
 router.put('/edit/(:id)', /* authentication_mdl.is_login,  */function(req,res
,next){
 req.assert('nama', 'Please fill the nama').notEmpty();
 var errors = req.validationErrors();
 if (!errors) {
10
v_nim = req.sanitize('nim').escape().trim();
v_nama = req.sanitize( 'nama' ).escape().trim();
v_tmptlhr = req.sanitize('tmptlhr').escape().trim();
v_tgllhr = req. sanitize('tgllhr').escape().trim();
v_jk = req.sanitize('jk').escape().trim();
v_alamat = req.sanitize( 'alamat' ).escape().trim();
v_jurusan = req.sanitize( 'jurusan' ).escape().trim();
v_kelas = req.sanitize('kelas').escape().trim();
v_semester = req.sanitize('semester').escape().trim();
v_ket = req.sanitize( 'ket' ).escape();

 var mahasiswa = {
    nim: v_nim,
    nama: v_nama,
    tmpt_lahir: v_tmptlhr,
    tgl_lahir: v_tgllhr,
    jenis_kelamin: v_jk,
    alamat: v_alamat, 
    jurusan: v_jurusan,
    kelas: v_kelas,
    semester: v_semester,
    ket : v_ket
 }

 var update_sql = 'update tbmsiswa SET ? where id = '+req.params.id;
 req.getConnection(function(err,connection){
 var query = connection.query(update_sql, mahasiswa, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Update : %s ",err );
 req.flash('msg_error', errors_detail);
 res.render('mahasiswa/edit',
 {
    nim: req.param('nim'),
    nama: req.param('nama'),
    tmpt_lahir: req.param('tmptlhr'),
    tgl_lahir: req.param('tgllhr'),
    jenis_kelamin: req.param('jk'),
    alamat: req.param('alamat'),
    jurusan: req.param('jurusan'),
    kelas: req.param('kelas'),
    semester: req.param('semester'),
    ket: req.param('ket'),
 });
 }else{
 req.flash('msg_info', 'Update mahasiswa success');
 res.redirect('/mahasiswa');
 }
 });
 });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error<ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('mahasiswa/add-mahasiswa',
 {
    nim: req.param('nim'),
    nama: req.param('nama'),
    tmpt_lahir: req.param('tmptlhr'),
    tgl_lahir: req.param('tgllhr'),
    jenis_kelamin: req.param('jk'),
    alamat: req.param('alamat'),
    jurusan: req.param('jurusan'),
    kelas: req.param('kelas'),
    semester: req.param('semester'),
    ket: req.param('ket'),
 });
 }
 });
 router.delete('/delete/(:id)',/* authentication_mdl.is_login,  */function(req
, res, next) {
 req.getConnection(function(err,connection){
 var mahasiswa = {
 id: req.params.id,
 }

 var delete_sql = 'delete from tbmsiswa where ?';
 req.getConnection(function(err,connection){
 var query = connection.query(delete_sql, mahasiswa, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Delete : %s ",err);
 req.flash('msg_error', errors_detail);
 res.redirect('/mahasiswa');
 }
 else{
 req.flash('msg_info', 'Delete mahasiswa Success');
 res.redirect('/mahasiswa');
 }
 });
 });
 });
})