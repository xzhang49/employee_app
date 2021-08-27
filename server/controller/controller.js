var Employeedb = require('../model/model');

// create and save new employee
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // new employee
    const employee = new Employeedb({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save employee in the database
    employee
        .save(employee)
        .then(data => {
            // res.send(data)
            res.redirect('/add-employee')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });  
}

// retrieve and return all employees/ retrive and return a single employee
exports.find = (req, res) => {
    
    if(req.query.id){
        const id = req.query.id;

        Employeedb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: "Not found employee with id" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error retrieving employee with id" + id})
            })
    }else{
        Employeedb.find()
            .then(employee => {
                res.send(employee)
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Error Occurred while retriving employee information"})
            })
    }

    
}

// Update a new identified employee by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot Update employee with ${id}. Maybe employee not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update employee information"})
        })
}

// Delete a employee with specified employee id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Employeedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannnot Delete with id ${id}. Maybe is wrong`})
            }else {
                res.send({
                    message: "Employee was deleted successfully!"
                })  
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
}