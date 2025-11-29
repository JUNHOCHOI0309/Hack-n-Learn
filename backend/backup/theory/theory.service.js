// services/theory.service.js
import mongoose from "mongoose";
import Technique from "../models/theory.model.js";
import TechniqueLevel from "../models/techniqueLevel.model.js";
import TechniqueContent from "../models/techniqueContent.model.js";

/**
 * 모든 Technique(카테고리) 리스트 조회
 * 반환: [{ _id, title, slug, description, createdAt, updatedAt }, ...]
 */
export const listTechniques = async () => {
  // 최소한의 필드만 반환해서 페이징/정렬에 유리하게 구성
  return Technique.find({}, { title: 1, slug: 1, level: 1, description: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();
};

/** 특정 기법 상세 조회 (이론 + 실습 레벨 + 참고자료) */
export const getTechniqueDetail = async (slug) => {
  const technique = await Technique.findOne({ slug }).lean();
  if (!technique) return null;

  const [ overview, levels, reference ] = await Promise.all([
    TechniqueContent.find({ techniqueId: technique._id, section : "overview" })
      .sort({ order: 1 })
      .select("order title contentType raw html blocks")
      .lean(),
    TechniqueLevel.find({ techniqueId: technique._id })
      .sort({ order: 1 })
      .select("_id order title summary")
      .lean(),
    TechniqueContent.find({ techniqueId: technique._id, section : "reference" })
      .sort({ order: 1 })
      .select("order title contentType raw html blocks")
      .lean(),
  ]);

  return { technique, overview, levels, reference };
}


/**
 * 이론 예제 코드 갖고 오기
 * techniqueId: ObjectId or slug
 * levelId: level document _id
 */
export const getTechniqueLevelDetail = async ( slug, order ) => {
  const technique = await Technique.findOne({ slug }).select("_id title slug").lean();
  if (!technique) return null;

  const level = await TechniqueLevel.findOne({ techniqueId: technique._id, order : Number(order), })
    .select("_id order title description exampleCode")
    .lean();

  if (!level) return null;

  return { technique, level };
};