const report = require('../../models/report');

const fetchReportsByPage = async (req, res) => {
    // ADJUST PAGING HERE
    const resultPerPage = 5;
    const page = req.body.pagenumber;
    try {
        const result = await report.find().select('title status').skip(page * resultPerPage).limit(resultPerPage);
        if (result.length === 0){
            res.json(
                [{title: 'No more result to display'}]
            );
        }else{
            res.json(result);
        }  
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const fetchReportById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await report.findOneAndUpdate({ _id: id }, {status: 'read'});
        res.json(result);
    }
    catch (e) {
        res.status(500).json(e.message)
    }
}

const deleteReport = async (req, res) => {
    const toDelete = req.body;
    //console.log('Delete voucher ' + voucher._id);
    try{
        await report.findOneAndDelete({ _id: toDelete._id });
        res.json('Report successfully deleted');
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

module.exports = {
    fetchReportsByPage,
    fetchReportById,
    deleteReport
}