const cds = require('@sap/cds')

class AdminService extends cds.ApplicationService {
  init() {
    const { Authors } = this.entities // similar to const Authors = this.entities.Authors

    // IMPORTANT: Use CREATE/UPDATE and return/throw on reject
    this.before(['CREATE', 'UPDATE'], Authors, this.validateLifeData)

    return super.init()
  }

  validateLifeData(req) {
    // Debug proof that this runs (you will see it in terminal)
    console.log('>>> validateLifeData called with:', req.data)

    const { dateOfBirth, dateOfDeath } = req.data
    if (!dateOfBirth || !dateOfDeath) return

    // Parse YYYY-MM-DD safely (no timezone surprises)
    const birth = Date.parse(`${dateOfBirth}T00:00:00Z`)
    const death = Date.parse(`${dateOfDeath}T00:00:00Z`)

    if (Number.isNaN(birth) || Number.isNaN(death)) {
      return req.reject(400, 'Invalid date format. Use YYYY-MM-DD for dateOfBirth/dateOfDeath.')
    }

    if (death < birth) {
      return req.reject(
        400,
        'DEATH_BEFORE_BIRTH', [dateOfDeath, dateOfBirth]
      )
    }
  }
}

module.exports = AdminService
