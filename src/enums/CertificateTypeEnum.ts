export enum CertificateTypeEnum {
  CADRE_TRAINING = 0,
  OTHERS = 1,
}

/**
 * 证书类型(0-干部培训,1-其他)
 */
export const certificateType = {
  [CertificateTypeEnum.CADRE_TRAINING]: {
    text: '干部培训',
  },
  [CertificateTypeEnum.OTHERS]: {
    text: '其他',
  },
};
