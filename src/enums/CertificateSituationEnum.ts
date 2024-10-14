export enum CertificateSituationEnum {
  HAVE = 0,
  NO = 1,
}
/**
 * 证书获得情况(0-有,1-没有)
 */
export const certificateSituation = {
  [CertificateSituationEnum.HAVE]: {
    text: '有',
  },
  [CertificateSituationEnum.NO]: {
    text: '没有',
  },
};
