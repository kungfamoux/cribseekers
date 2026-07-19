import { PropertyStatus } from '@prisma/client';

export class VerificationValidator {
  static isValidStatusTransition(currentStatus: PropertyStatus, newStatus: PropertyStatus): boolean {
    const validTransitions: Record<PropertyStatus, PropertyStatus[]> = {
      DRAFT: ['SUBMITTED'],
      SUBMITTED: ['UNDER_REVIEW', 'DRAFT'],
      UNDER_REVIEW: ['VERIFIED', 'REJECTED', 'SUBMITTED'],
      VERIFIED: ['PUBLISHED', 'UNPUBLISHED'],
      PUBLISHED: ['UNPUBLISHED', 'ARCHIVED'],
      UNPUBLISHED: ['PUBLISHED', 'ARCHIVED'],
      ARCHIVED: ['RESTORED'],
      REJECTED: ['SUBMITTED', 'ARCHIVED'],
      RESTORED: ['VERIFIED'],
      DELETED: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }

  static canPropertyBeVerified(status: PropertyStatus): boolean {
    return status === PropertyStatus.UNDER_REVIEW;
  }

  static canPropertyBePublished(status: PropertyStatus): boolean {
    return status === PropertyStatus.VERIFIED;
  }

  static canPropertyBeRejected(status: PropertyStatus): boolean {
    return status === PropertyStatus.UNDER_REVIEW || status === PropertyStatus.SUBMITTED;
  }

  static canPropertyBeSuspended(status: PropertyStatus): boolean {
    return status === PropertyStatus.PUBLISHED;
  }

  static canPropertyBeArchived(status: PropertyStatus): boolean {
    return status === PropertyStatus.PUBLISHED || status === PropertyStatus.UNPUBLISHED || status === PropertyStatus.REJECTED;
  }
}
