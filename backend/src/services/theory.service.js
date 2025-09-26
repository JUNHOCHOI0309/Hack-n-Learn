// services/theory.service.js
import mongoose from "mongoose";
import Technique from "../models/theory.model.js";
import TechniqueLevel from "../models/techniqueLevel.model.js";

/**
 * 모든 Technique(카테고리) 리스트 조회
 * 반환: [{ _id, title, slug, description, createdAt, updatedAt }, ...]
 */
export const listTechniques = async () => {
  // 최소한의 필드만 반환해서 페이징/정렬에 유리하게 구성
  return Technique.find({}, { title: 1, slug: 1, description: 1, createdAt: 1, updatedAt: 1 })
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * 특정 technique 의 모든 level 리스트 조회 (정렬: order 오름차순)
 * techniqueId : string (ObjectId or slug)
 */
export const listLevelsByTechnique = async (techniqueId) => {
  // techniqueId가 ObjectId인지 slug인지 판별
  let technique;
  if (mongoose.Types.ObjectId.isValid(techniqueId)) {
    technique = await Technique.findById(techniqueId).select("_id title slug description").lean();
  } else {
    technique = await Technique.findOne({ slug: techniqueId }).select("_id title slug description").lean();
  }
  if (!technique) return null;

  const levels = await TechniqueLevel.find({ techniqueId: technique._id })
    .sort({ order: 1 })
    .select("order name") // 목록에 필요한 최소 필드
    .lean();

  return { technique, levels };
};

/**
 * 특정 레벨의 상세 정보 조회
 * techniqueId: ObjectId or slug
 * levelId: level document _id
 */
export const getLevelDetail = async (techniqueId, levelId) => {
  // 먼저 technique 존재 여부 확인 (보안/유효성)
  let technique;
  if (mongoose.Types.ObjectId.isValid(techniqueId)) {
    technique = await Technique.findById(techniqueId).select("_id title slug").lean();
  } else {
    technique = await Technique.findOne({ slug: techniqueId }).select("_id title slug").lean();
  }
  if (!technique) return { notFound: true };

  // levelId 가 ObjectId 유효한지 검사
  if (!mongoose.Types.ObjectId.isValid(levelId)) {
    return { notFound: true };
  }

  const level = await TechniqueLevel.findOne({ _id: levelId, techniqueId: technique._id })
    .select("order name description theory exampleCode defense imageUrl warning createdAt updatedAt")
    .lean();

  if (!level) return { notFound: true };

  return { technique, level };
};