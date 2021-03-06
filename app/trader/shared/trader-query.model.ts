/**
 * Gateway Service
 * No descripton provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import * as core from '../../core';
import * as trader from '../../trader';

export interface TraderQuery {
    /** 
     * the id of the trader
     */
    id?: string;

    /**
     * the date time the trader created
     */
    created?: Date;

    /**
     * last time the trader updated
     */
    updated?: Date;

    /**
     * the last status of the trader
     */
    status?: trader.TraderStatusEnum;

    /**
     * the version number of the trader
     */
    version?: number;

    /**
     * the instrument that the trader is using
     */
    instrument?: core.InstrumentEnum;

    /**
     * the owner of the trader
     */
    userId?: string;
}
