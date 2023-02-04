const report = require('../../models/report');

const submitReport = async (req, res) => {
    const email = req.user;
    const title = req.body.title;
    const content = req.body.content;


    if (title == '' || content == '') {
        res.status(400).json({ error: 'Missing required field(s)' })
    }
    else {
        try {
            const newReport = new report({
                user: email,
                title: title,
                detail: content
            });

            await newReport.save();
            res.json('Your report has been submitted');
        }
        catch (e){
            res.status(400).json({ error: e.message })
        }
    }
}

module.exports = submitReport;