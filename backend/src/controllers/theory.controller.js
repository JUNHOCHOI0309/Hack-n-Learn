import * as theoryService from "../services/theory.service.js";

/**
 * GET /api/theory/techniques
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
 * GET /api/theory/techniques/:slug
 */
export const getTechniqueWithLevels = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await theoryService.getTechniqueDetail(slug);
    if (!result) {
      return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다" });
    }
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/theory/techniques/:slug/levels/:order
 */
export const getLevelDetail = async (req, res, next) => {
  try {
    const { slug, order } = req.params;
    const result = await theoryService.getTechniqueLevelDetail(slug, order);
    if (!result || result.notFound) {
      return res.status(404).json({ success: false, message: "데이터가 존재하지 않습니다" });
    }
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
