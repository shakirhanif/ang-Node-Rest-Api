const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true});

const articleSchema ={
    title:String,
    content:String
};
const Article = mongoose.model('Article',articleSchema);

////////////////////////////////////////////ALL Articles//////////////////////////////////////

app.route('/todos')
.get(function (req,res) {
    
    Article.find(function (err,result) {
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
        
    });

})
.post(function (req,res) {
    const new_article= new Article({
        title:req.body.title,
        content:req.body.content
    });
    new_article.save(function (err) {
        if (!err) {
            res.send('successfully added new article');
        }else{
            res.send(err)
        }
    });
})
.delete(function (req,res) {
    Article.deleteMany(function (err) {
        if (!err) {
            res.send('success deleted all articles');
        } else {
            res.send(err);
        }
    })
});





// app.get('/articles',function (req,res) {
    
//     Article.find(function (err,result) {
//         if(!err){
//             res.send(result);
//         }else{
//             res.send(err);
//         }
        
//     });

// });

// app.post('/articles',function (req,res) {
//     const new_article= new Article({
//         title:req.body.title,
//         content:req.body.content
//     });
//     new_article.save(function (err) {
//         if (!err) {
//             res.send('successfully added new article');
//         }else{
//             res.send(err)
//         }
//     });
// });


// app.delete('/articles',function (req,res) {
//     Article.deleteMany(function (err) {
//         if (!err) {
//             res.send('success deleted all articles');
//         } else {
//             res.send(err);
//         }
//     })
// });



////////////////////////////////////////////ALL specific article//////////////////////////////////////

app.route('/articles/:article_title')
.get(function (req,res) {
    Article.findOne({title: req.params.article_title},function (err, found_article) {
        if (found_article) {
            res.send(found_article);
        } else {
            res.send('no article found matching title: '+ req.params.article_title)
        }
    });
})
.put(function (req,res) {
    Article.updateOne(
        {title: req.params.article_title},
        {title: req.body.title,content: req.body.content},
        function (err) {
        if (!err) {
            res.send('success put');
        } else {
            res.send(err);
        }
    });
})
.delete(function (req,res) {
    Article.deleteOne({title: req.params.article_title},function (err) {
        if (!err) {
            res.send('successfully deleted');
        } else {
            res.send(err);
        }
    });
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
