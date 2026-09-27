const interviewService = require("../services/interviewService");

const sendError = (res, error) =>
  res.status(error.statusCode || 500).json({ error: error.message });

exports.createInterview = async (req, res) => {
  try {
    const interview = await interviewService.createInterview(req.body, req.user.id);
    res.status(201).json(interview);
  } catch (error) {
    sendError(res, error);
  }
};

exports.getInterviews = async (req, res) => {
  try {
    res.json(await interviewService.listInterviews(req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    res.json(await interviewService.getInterview(req.params.id, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateInterview = async (req, res) => {
  try {
    res.json(await interviewService.updateInterview(req.params.id, req.body, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.deleteInterview = async (req, res) => {
  try {
    await interviewService.deleteInterview(req.params.id, req.user);
    res.json({ message: "Interview deleted" });
  } catch (error) {
    sendError(res, error);
  }
};

exports.prepareInterview = async (req, res) => {
  try {
    res.json(await interviewService.prepareInterview(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.startInterview = async (req, res) => {
  try {
    res.json(await interviewService.startInterview(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.pauseInterview = async (req, res) => {
  try {
    res.json(await interviewService.pauseInterview(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.resumeInterview = async (req, res) => {
  try {
    res.json(await interviewService.resumeInterview(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.getQuestion = async (req, res) => {
  try {
    res.json(await interviewService.getQuestion(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    res.json(await interviewService.submitAnswer(req.params.interviewId, req.body, req.user));
  } catch (error) {
    sendError(res, error);
  }
};

exports.endInterview = async (req, res) => {
  try {
    res.json(await interviewService.endInterview(req.params.interviewId, req.user));
  } catch (error) {
    sendError(res, error);
  }
};
