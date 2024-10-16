export enum CertificateSituation {
  HAVE = 0,
  NO = 1,
}
/**
 * 证书获得情况(0-有,1-没有)
 */
export const certificateSituationEnum = {
  [CertificateSituation.HAVE]: {
    text: '有',
  },
  [CertificateSituation.NO]: {
    text: '没有',
  },
};
