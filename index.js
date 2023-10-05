require('./models/db')
const express = require('express')
const path = require('path')
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require("cookie-parser");
const session = require('express-session');


// const imagesPath=path.join(`C:\Users\Arnab Dutta\Desktop\node\Library`,'images');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: "abcd",
    saveUninitialized: true,
    Cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}))




// app.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     if (req.body.email == email && req.body.password == password) {
//         var session = req.session;
//         session.id = req.body.email;
//         res.redirect('student_dashboard');
//     }

//     else {
//         res.render('index', { msg: 'Authentication Failed' });
//     }
// })







const Register = require('./models/register');
const Adminreg = require('./models/adminreg');
const Book = require('./models/book.model');
const Request=require('./models/sent_req.model');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



app.get("/", (req, res) => {
    res.render('index')

})
app.get("/register", (req, res) => {
    res.render('register')

})

app.get("/login", (req, res) => {
    res.render('login')

})


app.get("/admin", (req, res) => {
    res.render('admin')

})

app.get("/adminreg", (req, res) => {
    res.render('adminreg')

})
app.get("/admin2_dashboard", (req, res) => {
    res.render('admin2_dashboard')

})
app.get("/add2_book", (req, res) => {
    res.render('add2_book')

})

app.get("/index", (req, res) => {
    res.render('index')

})

app.get("/student_dashboard", (req, res) => {
    res.render('student_dashboard')

})
app.post("/search", async (req, res) => {
    const x = req.body.search; // Get the search term from the form submission

    try {
       
        const searchData = await Book.find({ bname: x}).exec();

        // Render the search results using a view
        res.render("searchbook", { data: searchData });
    } catch (error) {
        console.error(error);
        res.status(500).send(" Error");
    }
});






app.get("/search", (req, res) => {
    Book.find()
    .then((data)=>{
        res.render('search',{data:data})
    })
    .catch((err)=>{
        console.log("error ="+err);
    })
    // res.render('search',{data:['NA']});

})


app.get("/book", (req, res) => {
    Book.find()
    .then((data) => {
        res.render('book', { data: data });
    })

})

// app.get("/request_queue", (req, res) => {
//     Request.find()
//     .then((data) => {
//         res.render('request_queue', { data: data });
//     })

// })

app.post('/request', async (req, res) => {
    try {
        const email = req.session.email;
        const bid = req.body.bid;
        console.log(email);
        console.log(req.body);
        
      
        const newRequest = new Request({ email, bid });
        await newRequest.save();

        console.log('Request saved successfully.');
        res.send('Request submitted successfully.');
    } catch (error) {
        console.error('Error saving request:', error);
        res.status(500).send('Internal Server Error');
    }
});


// app.post('/request', async (req, res) => {
  
//     const userId = req.body.userId; 
//     const bookId = req.body.bookId; 

//     try {
      
//         const newRequest = new Request({
//             uid: userId,
//             bid: bookId,
//             requestDate: new Date(),
//         });

//         await newRequest.save();
//         console.log(bookId)
//         console.log('Request saved successfully');
       
//         res.send('Request saved successfully');
//     } catch (err) {
//         console.error('Error saving request:', err);
        
//         res.status(500).send('Error saving request');
//     }
// });


     








app.get("/request_queue", (req, res) => {
    
    Request.find()
    .then((data) => {
        res.render('request_queue', { data: data });
    })
})



//admin register
app.post("/adminreg", async (req, res) => {
    try {
        const password1 = req.body.password1;
        const confirmpassword1 = req.body.confirmpassword1;
        if (password1 === confirmpassword1) {
            const registerStd1 = new Adminreg({
                name1: req.body.name1,
                email1: req.body.email1,
                phonenumber1: req.body.phonenumber1,
                address1: req.body.address1,
                password1: password1,
                confirmpassword1: confirmpassword1,
            })
            const registered1 = await registerStd1.save();
            res.status(201).render('index');

        }
        else {
            res.send("incorrect password");
        }

    } catch (error) {
        res.status(400).send(error);
    }

})


//student register
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            const registerStd = new Register({
                name: req.body.name,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
                password: password,
                confirmpassword: confirmpassword,
            })
            const registered = await registerStd.save();
            res.status(201).render('login');

        }
        else {
            res.send("incorrect password");
        }

    } catch (error) {
        res.status(400).send(error);
    }

})

//student login
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        

        const useremail = await Register.findOne({ email: email });

        if (useremail.password === password) {
            req.session.email=email
            res.status(201).render("student_dashboard");
        } else {
            res.send("incorrect password");
            
        }
        // console.log(`${email} and password is ${password}`);

    } catch (error) {
        res.status(400).send("invalid email")
    }
})

//admin login

app.post("/admin", async (req, res) => {
    try {
        const email1 = req.body.email1;
        const password1 = req.body.password1;
        const useremail1 = await Adminreg.findOne({ email1: email1 });

        if (useremail1.password1 === password1) {
            res.status(201).render("admin2_dashboard");
        } else {
            res.send("incorrect password");
        }
        // console.log(`${email} and password is ${password}`);

    } catch (error) {
        res.status(400).send("invalid email")
    }
})



app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get("/usf",  (req, res) => {
    // console.log("Hello")
    var email=req.session.email
    console.log(email);
    Register.find({email:email})
    .then((data)=>{
     
        console.log(data)
        res.render('usf',{data:data[0]})
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.post("/update", async (req, res) => {
    try {
        const myquery = { _id: req.body.id };
        const newvalues = { $set: { name: req.body.name, phonenumber: req.body.phonenumber, email: req.body.email, address: req.body.address } };

        const updateResult = await Register.updateOne(myquery, newvalues);

        console.log("Update successful:", updateResult);
        res.status(200).send("Update successful");
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send("Update failed");
    }
});







// var fname = 'NA'
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now()
//         fname = uniqueSuffix + "-" + file.originalname
//         cb(null, fname)
//     }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const fileExtension = file.originalname.split('.').pop();
      const filename = uniqueSuffix + '-' + file.originalname;
      cb(null, filename);
    }
  });


const upload = multer({ storage: storage })
// app.post("/save", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
//     const b = new Book(req.body)
//     b.img = fname

//     b.save()
//         .then((result) => {
//             console.log("data saved")
//         })
//         .catch((err) => {
//             console.log("Error=" + err)
//         })

// })

app.post("/save", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {

    const bid=req.body.bid;
    const bname=req.body.bname;
    const aname=req.body.aname;
    const pname=req.body.pname;
    const isbn=req.body.isbn;

    const img = req.files['image'][0].filename;
    const pdf = req.files['pdf'][0].filename;
  
    // Save filenames to the database
    try {
      const fileData = new Book({
        bid:bid,
        bname: bname,
        aname: aname,
        pname: pname,
        isbn:isbn,
        img: img,
        pdf: pdf,
      });
      await fileData.save();
      res.send('Files uploaded and saved to the database successfully');
    } catch (error) {
      console.error('Error saving files to the database:', error);
      res.status(500).send('An error occurred while saving files');
    }
  });





app.get("/show2_book", (req, res) => {
    Book.find()
        .then((data) => {
            res.render('show2_book', { data: data });
        })

})









app.listen(3000, () => {
    console.log("server is Running")
})




