declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCertificateReviewLogsVO_ = {
    code?: number;
    data?: CertificateReviewLogsVO;
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

  type BaseResponseListLong_ = {
    code?: number;
    data?: number[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLogPrintCertificateVO_ = {
    code?: number;
    data?: LogPrintCertificateVO;
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

  type BaseResponsePageCertificateReviewLogs_ = {
    code?: number;
    data?: PageCertificateReviewLogs_;
    message?: string;
  };

  type BaseResponsePageCertificateReviewLogsVO_ = {
    code?: number;
    data?: PageCertificateReviewLogsVO_;
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

  type BaseResponsePageLogPrintCertificate_ = {
    code?: number;
    data?: PageLogPrintCertificate_;
    message?: string;
  };

  type BaseResponsePageLogPrintCertificateVO_ = {
    code?: number;
    data?: PageLogPrintCertificateVO_;
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
    id?: number;
    isDelete?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    status?: string;
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
    userName?: string;
    userNumber?: string;
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
    id?: number;
    noId?: number;
    pageSize?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    userId?: number;
  };

  type CertificateReviewLogs = {
    certificateId?: number;
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
  };

  type CertificateReviewLogsAddRequest = {
    certificateId?: number;
    idList?: number[];
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type CertificateReviewLogsQueryRequest = {
    certificateId?: number;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CertificateReviewLogsVO = {
    certificateId?: number;
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    reviewerVO?: UserVO;
  };

  type CertificateUpdateRequest = {
    certificateName?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    id?: number;
    status?: string;
    userId?: number;
  };

  type CertificateVO = {
    certificateName?: string;
    certificateNumber?: string;
    certificateSituation?: number;
    certificateType?: number;
    certificateUrl?: string;
    certificateYear?: string;
    createTime?: string;
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    reviewerVO?: UserVO;
    status?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type Course = {
    courseName?: string;
    courseNumber?: number;
    createTime?: string;
    endTime?: string;
    id?: number;
    isDelete?: number;
    startTime?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type CourseAddRequest = {
    courseName?: string;
    courseNumber?: number;
    endTime?: string;
    startTime?: string;
    status?: string;
  };

  type CourseQueryRequest = {
    courseName?: string;
    courseNumber?: number;
    current?: number;
    endTime?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    status?: string;
    userId?: number;
  };

  type CourseUpdateRequest = {
    courseName?: string;
    courseNumber?: number;
    endTime?: string;
    id?: number;
    startTime?: string;
    status?: string;
  };

  type CourseVO = {
    courseName?: string;
    courseNumber?: number;
    createTime?: string;
    endTime?: string;
    id?: number;
    startTime?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getCertificateReviewLogsVOByIdUsingGETParams = {
    /** id */
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

  type getUserCertificateVOByIdUsingGET1Params = {
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
    id?: number;
    token?: string;
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };

  type LogPrintCertificate = {
    acquisitionTime?: string;
    certificateId?: number;
    courseId?: number;
    createTime?: string;
    finishTime?: string;
    id?: number;
    userId?: number;
  };

  type LogPrintCertificateAddRequest = {
    certificateId?: number;
    certificateIdList?: number[];
    courseId?: number;
    finishTime?: string;
    userId?: number;
  };

  type LogPrintCertificateQueryRequest = {
    acquisitionTime?: string;
    certificateId?: number;
    courseId?: number;
    createUserId?: number;
    current?: number;
    executorMessage?: string;
    finishTime?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    userId?: number;
  };

  type LogPrintCertificateVO = {
    acquisitionTime?: string;
    certificateId?: number;
    certificateVO?: CertificateVO;
    courseId?: number;
    courseVO?: CourseVO;
    createTime?: string;
    finishTime?: string;
    id?: number;
    userId?: number;
    userVO?: UserVO;
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

  type PageCertificateReviewLogs_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CertificateReviewLogs[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCertificateReviewLogsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CertificateReviewLogsVO[];
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

  type PageLogPrintCertificate_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: LogPrintCertificate[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageLogPrintCertificateVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: LogPrintCertificateVO[];
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

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userIdCard?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userIdCard?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserCertificate = {
    certificateId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserCertificateQueryRequest = {
    certificateId?: number;
    current?: number;
    id?: number;
    notId?: number;
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
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userVO?: UserVO;
  };

  type UserCourse = {
    courseId?: number;
    createTime?: string;
    id?: number;
    userId?: number;
  };

  type UserCourseAddRequest = {
    courseId?: number;
    userName?: string;
    userNumber?: string;
  };

  type UserCourseQueryRequest = {
    courseId?: number;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    userId?: number;
  };

  type UserCourseVO = {
    courseId?: number;
    courseVO?: CourseVO;
    createTime?: string;
    id?: number;
    userId?: number;
    userVO?: UserVO;
  };

  type UserEditRequest = {
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
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
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userIdCard?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userIdCard?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userDepartment?: string;
    userGender?: number;
    userGrade?: string;
    userMajor?: string;
    userName?: string;
    userNumber?: string;
    userPhone?: string;
    userRole?: string;
  };
}
