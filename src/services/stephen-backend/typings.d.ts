declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCertificateVO_ = {
    code?: number;
    data?: CertificateVO;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMapStringObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageCertificate_ = {
    code?: number;
    data?: PageCertificate_;
    message?: string;
  };

  type BaseResponsePageCertificateForUserVO_ = {
    code?: number;
    data?: PageCertificateForUserVO_;
    message?: string;
  };

  type BaseResponsePageCertificateVO_ = {
    code?: number;
    data?: PageCertificateVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserCertificate_ = {
    code?: number;
    data?: PageUserCertificate_;
    message?: string;
  };

  type BaseResponsePageUserCertificateVO_ = {
    code?: number;
    data?: PageUserCertificateVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserCertificateVO_ = {
    code?: number;
    data?: UserCertificateVO;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Certificate = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    createTime?: string;
    gainUserId?: number;
    id?: number;
    isDelete?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    updateTime?: string;
    userId?: number;
  };

  type CertificateAddRequest = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    gainUserId?: number;
  };

  type CertificateForUserVO = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    id?: number;
  };

  type CertificateQueryRequest = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    current?: number;
    gainUserId?: number;
    id?: number;
    noId?: number;
    pageSize?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type CertificateUpdateRequest = {
    certificateName?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    gainUserId?: number;
    id?: number;
  };

  type CertificateVO = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    createTime?: string;
    gainUserId?: number;
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getCertificateVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserCertificateVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCertificate_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Certificate[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCertificateForUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CertificateForUserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCertificateVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CertificateVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCertificate_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCertificate[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCertificateVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCertificateVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type ReviewRequest = {
    id?: number;
    idList?: string;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userIdCard?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userIdCard?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserCertificate = {
    certificateId?: number;
    certificateName?: string;
    certificateNumber?: string;
    createTime?: string;
    gainTime?: string;
    gainUserName?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserCertificateQueryRequest = {
    certificateId?: number;
    certificateName?: string;
    certificateNumber?: string;
    current?: number;
    gainTime?: string;
    gainUserName?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type UserCertificateVO = {
    certificateId?: number;
    certificateName?: string;
    certificateNumber?: string;
    certificateVO?: CertificateVO;
    createTime?: string;
    gainTime?: string;
    gainUserName?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type UserEditRequest = {
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userIdCard?: string;
    userName?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userEmail?: string;
    userGender?: number;
    userIdCard?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userCheckIdCard?: string;
    userIdCard?: string;
    userName?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userIdCard?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };
}
