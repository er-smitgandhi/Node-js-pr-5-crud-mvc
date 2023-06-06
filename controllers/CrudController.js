const { log } = require('console');
const crudtbl = require('../models/dbcrud')

const fs = require('fs');

const index = async (req, res) => {
    try {
        let user = await crudtbl.find({});
        if (user) {
            return res.render('form', {
                user,
                single: ""
            })
        } else {
            console.log("Record Not Fatch");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.render('back')
    }
}

const addData = async (req, res) => {
    try {
        const { editid, name, director, writer, actor, language, country, movietype } = req.body;
        if (editid) {
            if (req.file) {
                if (!name || !director || !writer || !actor || !language || !country || !movietype) {
                    console.log("Fill The Data");
                    return res.redirect('back');
                }
                let deletedata = await crudtbl.findById(editid);
                if (deletedata) {
                    fs.unlinkSync(deletedata.image);
                }
                else {
                    console.log("File Not Unlink");
                    return res.redirect('back');
                }
                let image = "";
                if (req.file) {
                    image = req.file.path;
                }
                let updatedata = await crudtbl.findByIdAndUpdate(editid, {
                    name: name,
                    director: director,
                    writer: writer,
                    actor: actor,
                    language: language,
                    country: country,
                    movietype: movietype,
                    image: image
                })
                if (updatedata) {
                    console.log("update successfully");
                    return res.redirect('/')
                }
                else {
                    console.log("Not update");
                    return res.redirect('/')
                }
            }
            else {
                let image = "";
                let singledata = await crudtbl.findById(editid);
                if (singledata) {
                    image = singledata.image;
                    let updatedata = await crudtbl.findByIdAndUpdate(editid, {
                        name: name,
                        director: director,
                        writer: writer,
                        actor: actor,
                        language: language,
                        country: country,
                        movietype: movietype,
                        image: image
                    })
                    if(updatedata){
                        console.log("Update successfully");
                        return res.redirect('/');
                    }
                    else{
                        console.log("Not Update");
                        return res.redirect('/');
                    }
                }
                else{
                    console.log("record not fatch");
                    return res.redirect('/');
                }
            }
        }
        else {
            if (!name || !director || !writer || !actor || !language || !country || !movietype) {
                console.log("Fill The Data");
                return res.redirect('back');
            }
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            let data = await crudtbl.create({
                name: name,
                director: director,
                writer: writer,
                actor: actor,
                language: language,
                country: country,
                movietype: movietype,
                image: image
            });
            if (data) {
                console.log("Data Successfully Inserted");
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

const deletedata = async (req, res) => {
    try {
        let id = req.query.id;
        let dltdata = await crudtbl.findById(id);
        if (dltdata) {
            fs.unlinkSync(dltdata.image);
        }
        else {
            console.log("Record Delete not");
            return res.redirect('/');
        }
        let data = await crudtbl.findByIdAndDelete(id);
        if (data) {
            console.log("delete successfull");
            return res.redirect('back')
        }
        else {
            console.log("record not delete");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

const editdata = async (req, res) => {
    try {
        let id = req.query.id;
        let alldata = await crudtbl.find({});
        let single = await crudtbl.findById(id);
        if (single) {
            return res.render('form', {
                single,
                user: alldata
            })
        }
        else {
            console.log("record not fatch");
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}

module.exports = {
    index,
    addData,
    deletedata,
    editdata
} 