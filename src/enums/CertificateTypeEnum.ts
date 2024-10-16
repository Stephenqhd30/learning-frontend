export enum CertificateType {
  CADRE_TRAINING = 0,
  OTHERS = 1,
}

/**
 * 证书类型(0-干部培训,1-其他)
 */
export const certificateTypeEnum = {
  [CertificateType.CADRE_TRAINING]: {
    text: '干部培训',
  },
  [CertificateType.OTHERS]: {
    text: '其他',
  },
};
