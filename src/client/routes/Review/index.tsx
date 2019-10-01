/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This Source Code Form is “Incompatible With Secondary Licenses”, as
 * defined by the Mozilla Public License, v. 2.0.
 */

import React from 'react'

import EntryPreviewList from '../../components/EntryPreviewList'
import PageTitle from '../../components/PageTitle'

const Review: React.FC = () => (
  <>
    <PageTitle textId="review.title" />

    <EntryPreviewList isReview />
  </>
)

export default Review
