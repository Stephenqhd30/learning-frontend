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

  type BaseResponseCourseVO_ = {
    code?: number;
    data?: CourseVO;
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

  type BaseResponsePageCertificatePrintVO_ = {
    code?: number;
    data?: PageCertificatePrintVO_;
    message?: string;
  };

  type BaseResponsePageCertificateVO_ = {
    code?: number;
    data?: PageCertificateVO_;
    message?: string;
  };

  type BaseResponsePageCourse_ = {
    code?: number;
    data?: PageCourse_;
    message?: string;
  };

  type BaseResponsePageCourseVO_ = {
    code?: number;
    data?: PageCourseVO_;
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

  type BaseResponsePageUserCourse_ = {
    code?: number;
    data?: PageUserCourse_;
    message?: string;
  };

  type BaseResponsePageUserCourseVO_ = {
    code?: number;
    data?: PageUserCourseVO_;
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

  type BaseResponseUserCourseVO_ = {
    code?: number;
    data?: UserCourseVO;
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

  type CertificatePrintRequest = {
    acquisitionTime?: string;
    certificateId?: number;
    current?: number;
    finishTime?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userCourseId?: number;
  };

  type CertificatePrintVO = {
    acquisitionTime?: string;
    certificateNumber?: string;
    courseName?: string;
    finishTime?: string;
    userGender?: string;
    userIdCard?: string;
    userName?: string;
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

  type Course = {
    acquisitionTime?: string;
    courseName?: string;
    courseNumber?: number;
    createTime?: string;
    finishTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
  };

  type CourseAddRequest = {
    acquisitionTime?: string;
    courseName?: string;
    courseNumber?: number;
    finishTime?: string;
  };

  type CourseQueryRequest = {
    acquisitionTime?: string;
    courseName?: string;
    courseNumber?: number;
    current?: number;
    finishTime?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type CourseUpdateRequest = {
    acquisitionTime?: string;
    courseName?: string;
    courseNumber?: number;
    finishTime?: string;
    id?: number;
  };

  type CourseVO = {
    acquisitionTime?: string;
    courseName?: string;
    courseNumber?: number;
    createTime?: string;
    finishTime?: string;
    id?: number;
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

  type getCourseVOByIdUsingGETParams = {
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

  type getUserCourseVOByIdUsingGETParams = {
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

  type PageCertificatePrintVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CertificatePrintVO[];
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

  type PageCourse_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Course[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCourseVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CourseVO[];
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

  type PageUserCourse_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCourse[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCourseVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCourseVO[];
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

  type UserCourse = {
    courseId?: number;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserCourseAddRequest = {
    courseId?: number;
    userId?: number;
  };

  type UserCourseQueryRequest = {
    courseId?: number;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type UserCourseVO = {
    courseId?: number;
    courseVO?: CourseVO;
    createTime?: string;
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
    userNumber?: string;
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
