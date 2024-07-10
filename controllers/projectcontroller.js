// controllers/projectControllers.js
const Project = require('../models/addproject');


// Controller to create a new project
const createProject = async (req, res) => {
  try {
    const { projectName, Reason, Type, Division, Category, Priority, Department, startDate, endDate, Location, status } = req.body;
    const newProject = new Project({
      projectName,
      Reason,
      Type,
      Division,
      Category,
      Priority,
      Department,
      startDate,
      endDate,
      Location,
      status,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatestatus = async (req, res) => {
  const { id } = req.body;
  const { status } = req.body;
  console.log(id, status);

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedProject) {
      console.log('Project not found');
      return res.status(404).send('Project not found');
    }
    console.log('Project updated successfully', updatedProject);
    res.send(updatedProject);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


const counterproject = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const closedProjects = await Project.countDocuments({ status: 'Close' });
    const runningProjects = await Project.countDocuments({ status: 'Running' });
    const cancelledProjects = await Project.countDocuments({ status: 'Cancel' });

    res.json({
      total_projects: totalProjects,
      closed_projects: closedProjects,
      running_projects: runningProjects,
      cancelled_projects: cancelledProjects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const today = new Date();

const delaycounterproject = async(req,res) =>{
  try {
    const runningDelayedProjects = await Project.countDocuments({
      status: 'Running',
      endDate: { $lt: today }
    });

    res.json({ running_delayed_projects: runningDelayedProjects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const chartProject = async(req,res) =>{
  try {
    const chartData = await Project.aggregate([
        {
            $group: {
                _id: "$Department",
                totalProjects: { $sum: 1 },
                closedProjects: {
                    $sum: { $cond: [{ $eq: ["$status", "Close"] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                department: "$_id",
                totalProjects: 1,
                closedProjects: 1,
                successPercentage: {
                    $cond: {
                        if: { $eq: ["$totalProjects", 0] },
                        then: 0,
                        else: {
                            $multiply: [
                                { $divide: ["$closedProjects", "$totalProjects"] },
                                100
                            ]
                        }
                    }
                }
            }
        }
    ]);

    res.json(chartData);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = {
  createProject,
  getProjects,
  updatestatus,
  counterproject,
  delaycounterproject,
  chartProject
};
