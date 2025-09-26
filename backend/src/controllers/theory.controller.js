// controllers/theory.controller.js
import * as theoryService from "../services/theory.service.js";

/**
 * GET /api/techniques
 */
export const listTechniques = async (req, res, next) => {
  try {
    const items = await theoryService.listTechniques();
    return res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/techniques/:techniqueId/levels
 */
export const listLevels = async (req, res, next) => {
  try {
    const { techniqueId } = req.params;
    const result = await theoryService.listLevelsByTechnique(techniqueId);
    if (!result) {
      return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다" });
    }
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/techniques/:techniqueId/levels/:levelId
 */
export const getLevelDetail = async (req, res, next) => {
  try {
    const { techniqueId, levelId } = req.params;
    const result = await theoryService.getLevelDetail(techniqueId, levelId);
    if (!result || result.notFound) {
      return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다" });
    }
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
